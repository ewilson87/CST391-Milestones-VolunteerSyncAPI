import { Request, RequestHandler, Response } from 'express';
import { Event } from './events.model';
import * as EventsDao from './events.dao';
import { OkPacket } from 'mysql';

// Handler to fetch all events
export const readEvents: RequestHandler = async (req: Request, res: Response) => {
    try {
        const events = await EventsDao.readEvents();
        res.status(200).json(events);
    } catch (error) {
        console.error('[events.controller][readEvents][Error] ', error);
        res.status(500).json({
            message: 'There was an error fetching events'
        });
    }
};

// Handler to fetch an event by ID
export const readEventById: RequestHandler = async (req: Request, res: Response) => {
    try {
        const eventId = parseInt(req.params.eventId as string);
        if (Number.isNaN(eventId)) throw new Error("Invalid event ID");

        const event = await EventsDao.readEventById(eventId);
        res.status(200).json(event);
    } catch (error) {
        console.error('[events.controller][readEventById][Error] ', error);
        res.status(500).json({
            message: 'There was an error fetching the event'
        });
    }
};

// Handler to search events by city, state, date, and/or organization
export const searchEvents: RequestHandler = async (req: Request, res: Response) => {
    try {
        const { city, state, date, organizationId } = req.query;
        const events = await EventsDao.searchEvents(
            city as string, state as string, date as string, Number(organizationId)
        );
        res.status(200).json(events);
    } catch (error) {
        console.error('[events.controller][searchEvents][Error] ', error);
        res.status(500).json({
            message: 'There was an error searching events'
        });
    }
};

// Handler to create a new event
export const createEvent: RequestHandler = async (req: Request, res: Response) => {
    try {
        const okPacket: OkPacket = await EventsDao.createEvent(req.body);
        res.status(201).json(okPacket);
    } catch (error: any) {
        console.error('[events.controller][createEvent][Error] ', error);

        // Handle duplicate event error
        if (error.code === 'ER_DUP_ENTRY') {
            res.status(400).json({
                message: 'An event with this title, date, time, and location already exists for this organization'
            });
            return;
        }

        res.status(500).json({
            message: 'There was an error creating the event'
        });
    }
};

// Handler to update an existing event
export const updateEvent: RequestHandler = async (req: Request, res: Response) => {
    try {
        const okPacket: OkPacket = await EventsDao.updateEvent(req.body);
        res.status(200).json(okPacket);
    } catch (error: any) {
        console.error('[events.controller][updateEvent][Error] ', error);

        // Handle duplicate event error
        if (error.code === 'ER_DUP_ENTRY') {
            res.status(400).json({
                message: 'An event with this title, date, time, and location already exists for this organization'
            });
            return;
        }

        res.status(500).json({
            message: 'There was an error updating the event'
        });
    }
};

// Handler to delete an event
export const deleteEvent: RequestHandler = async (req: Request, res: Response) => {
    try {
        const eventId = parseInt(req.params.eventId as string);
        if (Number.isNaN(eventId)) throw new Error("Invalid event ID");

        const response = await EventsDao.deleteEvent(eventId);
        res.status(200).json(response);
    } catch (error) {
        console.error('[events.controller][deleteEvent][Error] ', error);
        res.status(500).json({
            message: 'There was an error deleting the event'
        });
    }
};
