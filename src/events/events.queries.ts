export const eventQueries = {
    // Query to fetch all events with aliased column names
    readEvents: `
        SELECT 
            event_id AS eventId, title, description, 
            event_date AS eventDate, event_time AS eventTime, 
            location_name AS locationName, address, city, state, 
            num_needed AS numNeeded, num_signed_up AS numSignedUp, 
            created_by AS createdBy, organization_id AS organizationId
        FROM volunteersync.events
    `,

    // Query to fetch a specific event by its ID
    readEventById: `
        SELECT 
            event_id AS eventId, title, description, 
            event_date AS eventDate, event_time AS eventTime, 
            location_name AS locationName, address, city, state, 
            num_needed AS numNeeded, num_signed_up AS numSignedUp, 
            created_by AS createdBy, organization_id AS organizationId
        FROM volunteersync.events
        WHERE event_id = ?
    `,

    // Query to search events by city, state, date, and/or organization
    searchEvents: `
        SELECT 
            event_id AS eventId, title, description, 
            event_date AS eventDate, event_time AS eventTime, 
            location_name AS locationName, address, city, state, 
            num_needed AS numNeeded, num_signed_up AS numSignedUp, 
            created_by AS createdBy, organization_id AS organizationId
        FROM volunteersync.events
        WHERE 
            (city = COALESCE(?, city))
            AND (state = COALESCE(?, state))
            AND (event_date = COALESCE(?, event_date))
            AND (organization_id = COALESCE(?, organization_id))
    `,

    // Query to insert a new event
    createEvent: `
        INSERT INTO volunteersync.events 
            (title, description, event_date, event_time, location_name, address, 
             city, state, num_needed, num_signed_up, created_by, organization_id)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `,

    // Query to update an existing event
    updateEvent: `
        UPDATE volunteersync.events
        SET title = ?, description = ?, event_date = ?, event_time = ?, 
            location_name = ?, address = ?, city = ?, state = ?, 
            num_needed = ?, num_signed_up = ?, created_by = ?, organization_id = ?, updated_at = NOW()
        WHERE event_id = ?
    `,

    // Query to delete an event
    deleteEvent: `
        DELETE FROM volunteersync.events
        WHERE event_id = ?
    `
};
