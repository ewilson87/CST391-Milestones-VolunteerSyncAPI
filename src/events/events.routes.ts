import { Router } from 'express';
import * as EventsController from './events.controller';

const router = Router();

// GET /events - Retrieve all events
router.
    route('/events').
    get(EventsController.readEvents);

// GET /events/search - Search events by city, state, date, and/or organization
router.
    route('/events/search').
    get(EventsController.searchEvents);

// GET /events/:eventId - Retrieve a specific event by ID
router.
    route('/events/:eventId').
    get(EventsController.readEventById);

// POST /events - Create a new event (Organizer only)
router.
    route('/events').
    post(EventsController.createEvent);

// PUT /events - Update an existing event (Organizer only)
router.
    route('/events').
    put(EventsController.updateEvent);

// DELETE /events/:eventId - Delete an event (Organizer/Admin only)
router.
    route('/events/:eventId').
    delete(EventsController.deleteEvent);

export default router;
