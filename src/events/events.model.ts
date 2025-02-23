import { Organization } from '../organizations/organizations.model';

// Define the Event interface
export interface Event {
    eventId: number;
    title: string;
    description: string;
    eventDate: Date;
    eventTime: string;
    locationName: string;
    address: string;
    city: string;
    state: string;
    numNeeded: number;
    numSignedUp: number;
    createdBy: number; // References User ID
    organizationId: number; // References Organization ID
    organization?: Organization; // Optional: Includes organization details if needed
}
