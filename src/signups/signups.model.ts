import { User } from '../users/users.model';
import { Event } from '../events/events.model';

// Define the SignupStatus type
export type SignupStatus = 'registered' | 'canceled';

// Define the Signup interface
export interface Signup {
    signupId: number;
    userId: number;
    eventId: number;
    signupDate: Date;
    status: SignupStatus;
    user?: User;  // Optional: Includes user details if needed
    event?: Event; // Optional: Includes event details if needed
}
