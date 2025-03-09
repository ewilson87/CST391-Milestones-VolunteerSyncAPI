import { Request, RequestHandler, Response } from 'express';
import { User } from './users.model';
import * as UsersDao from './users.dao';
import { OkPacket } from 'mysql';
import * as OrganizationsDao from '../organizations/organizations.dao';

// Handler to fetch all users (Admin only)
export const readUsers: RequestHandler = async (req: Request, res: Response) => {
    try {
        const users = await UsersDao.readUsers();
        res.status(200).json(users);
    } catch (error) {
        console.error('[users.controller][readUsers][Error] ', error);
        res.status(500).json({
            message: 'There was an error fetching users'
        });
    }
};

// Handler to fetch a user by ID
export const readUserById: RequestHandler = async (req: Request, res: Response) => {
    try {
        const userId = parseInt(req.params.userId as string);
        if (Number.isNaN(userId)) throw new Error("Invalid user ID");

        const user = await UsersDao.readUserById(userId);
        res.status(200).json(user);
    } catch (error) {
        console.error('[users.controller][readUserById][Error] ', error);
        res.status(500).json({
            message: 'There was an error fetching the user'
        });
    }
};

// Handler to fetch a user by email (for authentication)
export const readUserByEmail: RequestHandler = async (req: Request, res: Response) => {
    try {
        const email = req.params.email;
        const user = await UsersDao.readUserByEmail(email);
        res.status(200).json(user);
    } catch (error) {
        console.error('[users.controller][readUserByEmail][Error] ', error);
        res.status(500).json({
            message: 'There was an error fetching the user by email'
        });
    }
};

// Handler to create a new user (registration)
export const createUser: RequestHandler = async (req: Request, res: Response) => {
    try {
        const okPacket: OkPacket = await UsersDao.createUser(req.body);
        res.status(201).json(okPacket);
    } catch (error: any) {
        console.error('[users.controller][createUser][Error] ', error);

        // Handle duplicate email error
        if (error.code === 'ER_DUP_ENTRY') {
            res.status(400).json({
                message: 'A user with this email already exists'
            });
            return;
        }

        res.status(500).json({
            message: 'There was an error creating the user'
        });
    }
};

// Handler to update an existing user
export const updateUser: RequestHandler = async (req: Request, res: Response) => {
    try {
        const okPacket: OkPacket = await UsersDao.updateUser(req.body);
        res.status(200).json(okPacket);
    } catch (error: any) {
        console.error('[users.controller][updateUser][Error] ', error);

        // Handle duplicate email error
        if (error.code === 'ER_DUP_ENTRY') {
            res.status(400).json({
                message: 'A user with this email already exists'
            });
            return;
        }

        res.status(500).json({
            message: 'There was an error updating the user'
        });
    }
};

// Handler to delete a user (Admin only)
export const deleteUser: RequestHandler = async (req: Request, res: Response) => {
    try {
        const userId = parseInt(req.params.userId);

        // First, retrieve the user to check if they are an organization leader
        const user = await UsersDao.readUserById(userId);

        if (!user || user.length === 0) {
            res.status(404).json({
                message: 'User not found'
            });
            return;
        }

        // Extract the user from the array
        const userData = user[0];

        // Check if the user is an organizer and has an organization attached
        if (userData.role === 'organizer' && userData.organizationId) {
            // Delete the organization first, which will cascade to delete events and signups
            await OrganizationsDao.deleteOrganization(userData.organizationId);
            console.log(`Organization ${userData.organizationId} deleted as part of user ${userId} deletion`);
        }

        // Now delete the user
        const response = await UsersDao.deleteUser(userId);
        res.status(200).json(response);
    } catch (error) {
        console.error('[users.controller][deleteUser][Error] ', error);
        res.status(500).json({
            message: 'There was an error deleting the user'
        });
    }
};

// Handler to link a user to an organization (set them as the organization leader)
export const linkUserToOrganization: RequestHandler = async (req: Request, res: Response) => {
    try {
        const userId = parseInt(req.params.userId);
        const { organizationId } = req.body;

        if (!organizationId) {
            res.status(400).json({
                message: 'Organization ID is required'
            });
            return;
        }

        // First, get the user to check if they exist and to get their current data
        const user = await UsersDao.readUserById(userId);

        if (!user || user.length === 0) {
            res.status(404).json({
                message: 'User not found'
            });
            return;
        }

        // Make sure the organization exists
        const organization = await OrganizationsDao.readOrganizationById(organizationId);

        if (!organization || organization.length === 0) {
            res.status(404).json({
                message: 'Organization not found'
            });
            return;
        }

        // Prepare the updated user data
        const userData = user[0];
        userData.organizationId = organizationId;

        // If the user is not already an organizer, set their role
        if (userData.role !== 'organizer') {
            userData.role = 'organizer';
        }

        // Update the user with the organization ID
        const response = await UsersDao.updateUser(userData);

        res.status(200).json({
            message: 'User successfully linked to organization',
            userId,
            organizationId,
            response
        });
    } catch (error) {
        console.error('[users.controller][linkUserToOrganization][Error] ', error);
        res.status(500).json({
            message: 'There was an error linking the user to the organization'
        });
    }
};
