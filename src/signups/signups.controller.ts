import { Request, RequestHandler, Response } from 'express';
import { OkPacket } from 'mysql';
import * as SignupsDao from './signups.dao';
import * as EventsDao from '../events/events.dao';

export const readSignups: RequestHandler = async (req: Request, res: Response) => {
    try {
        const signups = await SignupsDao.readSignups();
        res.status(200).json(signups);
    } catch (error) {
        console.error('[signups.controller][readSignups][Error] ', error);
        res.status(500).json({
            message: 'There was an error fetching signups'
        });
    }
};

export const readSignupsByUserId: RequestHandler = async (req: Request, res: Response) => {
    try {
        const userId = parseInt(req.params.userId);
        const signups = await SignupsDao.readSignupsByUserId(userId);
        res.status(200).json(signups);
    } catch (error) {
        console.error('[signups.controller][readSignupsByUserId][Error] ', error);
        res.status(500).json({
            message: 'There was an error fetching user signups'
        });
    }
};

export const readSignupsByEventId: RequestHandler = async (req: Request, res: Response) => {
    try {
        const eventId = parseInt(req.params.eventId);
        const signups = await SignupsDao.readSignupsByEventId(eventId);
        res.status(200).json(signups);
    } catch (error) {
        console.error('[signups.controller][readSignupsByEventId][Error] ', error);
        res.status(500).json({
            message: 'There was an error fetching event signups'
        });
    }
};

export const createSignup: RequestHandler = async (req: Request, res: Response) => {
    try {
        // First, create the signup record
        const okPacket: OkPacket = await SignupsDao.createSignup(req.body);

        // Then, increment the event's signup count
        await EventsDao.incrementSignupCount(req.body.eventId);

        res.status(200).json(okPacket);
    } catch (error: any) {
        console.error('[signups.controller][createSignup][Error] ', error);

        // Check if the error is a duplicate key error
        if (error.code === 'ER_DUP_ENTRY') {
            res.status(400).json({
                message: 'User is already signed up for this event'
            });
            return;
        }

        // If the error is not a duplicate key error, return a generic error message
        res.status(500).json({
            message: 'There was an error creating the signup'
        });
    }
};

export const deleteSignup: RequestHandler = async (req: Request, res: Response) => {
    try {
        const signupId = parseInt(req.params.signupId);

        // First, get the signup to retrieve the eventId
        const signup = await SignupsDao.readSignupById(signupId);

        if (!signup) {
            res.status(404).json({
                message: 'Signup not found'
            });
            return;
        }

        // Delete the signup
        const response = await SignupsDao.deleteSignup(signupId);

        // Decrement the event's signup count
        await EventsDao.decrementSignupCount(signup.eventId);

        res.status(200).json(response);
    } catch (error) {
        console.error('[signups.controller][deleteSignup][Error] ', error);
        res.status(500).json({
            message: 'There was an error deleting the signup'
        });
    }
};
