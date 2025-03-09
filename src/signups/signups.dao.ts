import { OkPacket } from 'mysql';
import { execute } from '../services/mysql.connector';
import { Signup } from './signups.model';
import { signupQueries } from './signups.queries';

// Fetch all signups (Admin only)
export const readSignups = async () => {
    return execute<Signup[]>(signupQueries.readSignups, []);
};

// Fetch all signups for a specific user
export const readSignupsByUserId = async (userId: number) => {
    return execute<Signup[]>(signupQueries.readSignupsByUserId, [userId]);
};

// Fetch all signups for a specific event
export const readSignupsByEventId = async (eventId: number) => {
    return execute<Signup[]>(signupQueries.readSignupsByEventId, [eventId]);
};

// Fetch a specific signup by ID
export const readSignupById = async (signupId: number) => {
    return execute<Signup[]>(signupQueries.readSignupById, [signupId])
        .then(signups => signups[0]); // Return the first (and only) signup
};

// Register a user for an event
export const createSignup = async (signup: Signup) => {
    return execute<OkPacket>(signupQueries.createSignup, [
        signup.userId, signup.eventId
    ]);
};

// De-register a user from an event
export const deleteSignup = async (signupId: number) => {
    return execute<OkPacket>(signupQueries.deleteSignup, [signupId]);
};
