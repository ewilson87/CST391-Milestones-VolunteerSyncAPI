import { OkPacket } from 'mysql';
import { execute } from '../services/mysql.connector';
import { User } from './users.model';
import { userQueries } from './users.queries';

// Fetch all users from the database (Admin only)
export const readUsers = async () => {
    return execute<User[]>(userQueries.readUsers, []);
};

// Fetch a specific user by ID
export const readUserById = async (userId: number) => {
    return execute<User[]>(userQueries.readUserById, [userId]);
};

// Fetch a user by email (For authentication)
export const readUserByEmail = async (email: string) => {
    return execute<User[]>(userQueries.readUserByEmail, [email]);
};

// Create a new user in the database
export const createUser = async (user: User) => {
    return execute<OkPacket>(userQueries.createUser, [
        user.firstName, user.lastName, user.email, user.passwordHash, user.role, user.organizationId || null // Ensure null if not provided
    ]);
};

// Update an existing user
export const updateUser = async (user: User) => {
    return execute<OkPacket>(userQueries.updateUser, [
        user.firstName, user.lastName, user.email, user.passwordHash, user.role, user.organizationId || null, user.userId
    ]);
};

// Delete a user from the database (Admin only)
export const deleteUser = async (userId: number) => {
    return execute<OkPacket>(userQueries.deleteUser, [userId]);
};
