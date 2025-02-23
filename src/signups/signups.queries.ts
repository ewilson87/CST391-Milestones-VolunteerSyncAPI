export const signupQueries = {
    // Query to fetch all signups (Admin only)
    readSignups: `
        SELECT 
            signup_id AS signupId, user_id AS userId, event_id AS eventId, 
            signup_date AS signupDate, status
        FROM volunteersync.signups
    `,

    // Query to fetch all signups for a specific user
    readSignupsByUserId: `
        SELECT 
            signup_id AS signupId, user_id AS userId, event_id AS eventId, 
            signup_date AS signupDate, status
        FROM volunteersync.signups
        WHERE user_id = ?
    `,

    // Query to fetch all signups for a specific event
    readSignupsByEventId: `
        SELECT 
            signup_id AS signupId, user_id AS userId, event_id AS eventId, 
            signup_date AS signupDate, status
        FROM volunteersync.signups
        WHERE event_id = ?
    `,

    // Query to insert a new signup (user registers for an event)
    createSignup: `
        INSERT INTO volunteersync.signups 
            (user_id, event_id, signup_date, status)
        VALUES (?, ?, ?, ?)
    `,

    // Query to delete a signup (user de-registers from an event)
    deleteSignup: `
        DELETE FROM volunteersync.signups
        WHERE signup_id = ?
    `
};
