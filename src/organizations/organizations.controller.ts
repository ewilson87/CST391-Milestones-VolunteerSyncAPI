import { Request, RequestHandler, Response } from 'express';
import { OkPacket } from 'mysql';
import * as OrganizationsDao from './organizations.dao';
import * as UsersDao from '../users/users.dao';

// Handler to fetch all organizations
export const readOrganizations: RequestHandler = async (req: Request, res: Response) => {
    try {
        const organizations = await OrganizationsDao.readOrganizations();
        res.status(200).json(organizations);
    } catch (error) {
        console.error('[organizations.controller][readOrganizations][Error] ', error);
        res.status(500).json({
            message: 'There was an error fetching organizations'
        });
    }
};

// Handler to fetch an organization by ID
export const readOrganizationById: RequestHandler = async (req: Request, res: Response) => {
    try {
        const organizationId = parseInt(req.params.organizationId);
        const organization = await OrganizationsDao.readOrganizationById(organizationId);
        res.status(200).json(organization);
    } catch (error) {
        console.error('[organizations.controller][readOrganizationById][Error] ', error);
        res.status(500).json({
            message: 'There was an error fetching the organization'
        });
    }
};

// Handler to fetch an organization by name
export const readOrganizationByName: RequestHandler = async (req: Request, res: Response) => {
    try {
        const name = req.params.name;
        const organization = await OrganizationsDao.readOrganizationByName(name);

        if (!organization || organization.length === 0) {
            res.status(404).json({
                message: 'Organization not found'
            });
            return;
        }

        res.status(200).json(organization[0]);
    } catch (error) {
        console.error('[organizations.controller][readOrganizationByName][Error] ', error);
        res.status(500).json({
            message: 'There was an error fetching the organization'
        });
    }
};

// Handler to create a new organization
export const createOrganization: RequestHandler = async (req: Request, res: Response) => {
    try {
        // Extract the userId from the request if provided
        const { userId, ...organizationData } = req.body;

        // Create the organization
        const okPacket: OkPacket = await OrganizationsDao.createOrganization(organizationData);

        // If a userId was provided, link the user to this new organization
        if (userId) {
            try {
                // Get the newly created organization's ID
                const organizationId = okPacket.insertId;

                // Get the user
                const user = await UsersDao.readUserById(userId);

                if (user && user.length > 0) {
                    const userData = user[0];

                    // Update the user with the organization ID and set as organizer
                    userData.organizationId = organizationId;
                    if (userData.role !== 'organizer') {
                        userData.role = 'organizer';
                    }

                    await UsersDao.updateUser(userData);

                    // Return both the organization creation result and the user link information
                    res.status(201).json({
                        organization: okPacket,
                        userLinked: true,
                        userId,
                        organizationId
                    });
                    return;
                }
            } catch (linkError) {
                console.error('[organizations.controller][createOrganization][LinkUserError] ', linkError);
                // Continue with regular response if linking failed
            }
        }

        // Regular response if no userId was provided or linking failed
        // Include the insertId explicitly for clarity (even though it's already in okPacket)
        res.status(201).json({
            ...okPacket,
            organizationId: okPacket.insertId  // Make the organizationId prominent in the response
        });
    } catch (error: any) {
        console.error('[organizations.controller][createOrganization][Error] ', error);

        // Handle duplicate organization name error
        if (error.code === 'ER_DUP_ENTRY') {
            res.status(400).json({
                message: 'An organization with this name already exists'
            });
            return;
        }

        res.status(500).json({
            message: 'There was an error creating the organization'
        });
    }
};

// Handler to update an existing organization
export const updateOrganization: RequestHandler = async (req: Request, res: Response) => {
    try {
        const okPacket: OkPacket = await OrganizationsDao.updateOrganization(req.body);
        res.status(200).json(okPacket);
    } catch (error: any) {
        console.error('[organizations.controller][updateOrganization][Error] ', error);

        // Handle duplicate organization name error
        if (error.code === 'ER_DUP_ENTRY') {
            res.status(400).json({
                message: 'An organization with this name already exists'
            });
            return;
        }

        res.status(500).json({
            message: 'There was an error updating the organization'
        });
    }
};

// Handler to delete an organization
export const deleteOrganization: RequestHandler = async (req: Request, res: Response) => {
    try {
        const organizationId = parseInt(req.params.organizationId);
        const response = await OrganizationsDao.deleteOrganization(organizationId);
        res.status(200).json(response);
    } catch (error) {
        console.error('[organizations.controller][deleteOrganization][Error] ', error);
        res.status(500).json({
            message: 'There was an error deleting the organization'
        });
    }
};
