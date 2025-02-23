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

// Register a user for an event
export const createSignup = async (signup: Signup) => {
    return execute<OkPacket>(signupQueries.createSignup, [
        signup.userId, signup.eventId, signup.signupDate, signup.status
    ]);
};

// De-register a user from an event
export const deleteSignup = async (signupId: number) => {
    return execute<OkPacket>(signupQueries.deleteSignup, [signupId]);
};
