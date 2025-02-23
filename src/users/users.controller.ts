import { Request, RequestHandler, Response } from 'express';
import { User } from './users.model';
import * as UsersDao from './users.dao';
import { OkPacket } from 'mysql';

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
        res.status(200).json(okPacket);
    } catch (error) {
        console.error('[users.controller][createUser][Error] ', error);
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
    } catch (error) {
        console.error('[users.controller][updateUser][Error] ', error);
        res.status(500).json({
            message: 'There was an error updating the user'
        });
    }
};

// Handler to delete a user (Admin only)
export const deleteUser: RequestHandler = async (req: Request, res: Response) => {
    try {
        const userId = parseInt(req.params.userId as string);
        if (Number.isNaN(userId)) throw new Error("Invalid user ID");

        const response = await UsersDao.deleteUser(userId);
        res.status(200).json(response);
    } catch (error) {
        console.error('[users.controller][deleteUser][Error] ', error);
        res.status(500).json({
            message: 'There was an error deleting the user'
        });
    }
};
