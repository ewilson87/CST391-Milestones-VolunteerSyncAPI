import { OkPacket } from 'mysql';
import { execute } from '../services/mysql.connector';
import { Event } from './events.model';
import { eventQueries } from './events.queries';

// Fetch all events from the database
export const readEvents = async () => {
    return execute<Event[]>(eventQueries.readEvents, []);
};

// Fetch a specific event by its ID
export const readEventById = async (eventId: number) => {
    return execute<Event[]>(eventQueries.readEventById, [eventId]);
};

// Search events by city, state, date, and/or organization
export const searchEvents = async (city?: string, state?: string, date?: string, organizationId?: number) => {
    return execute<Event[]>(eventQueries.searchEvents, [
        city || null,
        state || null,
        date || null,
        organizationId || null
    ]);
};

// Create a new event in the database
export const createEvent = async (event: Event) => {
    return execute<OkPacket>(eventQueries.createEvent, [
        event.title, event.description, event.eventDate, event.eventTime,
        event.locationName, event.address, event.city, event.state,
        event.numNeeded, event.numSignedUp, event.createdBy, event.organizationId
    ]);
};

// Update an existing event
export const updateEvent = async (event: Event) => {
    return execute<OkPacket>(eventQueries.updateEvent, [
        event.title, event.description, event.eventDate, event.eventTime,
        event.locationName, event.address, event.city, event.state,
        event.numNeeded, event.numSignedUp, event.createdBy, event.organizationId, event.eventId
    ]);
};

// Delete an event by ID
export const deleteEvent = async (eventId: number) => {
    return execute<OkPacket>(eventQueries.deleteEvent, [eventId]);
};

// Increment the number of signups for an event
export const incrementSignupCount = async (eventId: number) => {
    return execute<OkPacket>(eventQueries.incrementSignupCount, [eventId]);
};

// Decrement the number of signups for an event
export const decrementSignupCount = async (eventId: number) => {
    return execute<OkPacket>(eventQueries.decrementSignupCount, [eventId]);
};
