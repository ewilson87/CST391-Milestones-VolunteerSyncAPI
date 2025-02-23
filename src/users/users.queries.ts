export const userQueries = {
    // Query to fetch all users
    readUsers: `
        SELECT 
            user_id AS userId, first_name AS firstName, last_name AS lastName, 
            email, password_hash AS passwordHash, role, 
            last_login AS lastLogin, created_at AS createdAt, updated_at AS updatedAt
        FROM volunteersync.users
    `,

    // Query to fetch a specific user by ID
    readUserById: `
        SELECT 
            user_id AS userId, first_name AS firstName, last_name AS lastName, 
            email, password_hash AS passwordHash, role, 
            last_login AS lastLogin, created_at AS createdAt, updated_at AS updatedAt
        FROM volunteersync.users
        WHERE user_id = ?
    `,

    // Query to fetch a user by email (for authentication)
    readUserByEmail: `
        SELECT 
            user_id AS userId, first_name AS firstName, last_name AS lastName, 
            email, password_hash AS passwordHash, role, 
            last_login AS lastLogin, created_at AS createdAt, updated_at AS updatedAt
        FROM volunteersync.users
        WHERE email = ?
    `,

    // Query to insert a new user
    createUser: `
        INSERT INTO volunteersync.users 
            (first_name, last_name, email, password_hash, role)
        VALUES (?, ?, ?, ?, ?)
    `,

    // Query to update an existing user
    updateUser: `
        UPDATE volunteersync.users
        SET first_name = ?, last_name = ?, email = ?, password_hash = ?, role = ?, updated_at = NOW()
        WHERE user_id = ?
    `,

    // Query to delete a user
    deleteUser: `
        DELETE FROM volunteersync.users
        WHERE user_id = ?
    `
};
