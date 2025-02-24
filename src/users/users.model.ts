// Define the UserRole type
export type UserRole = 'volunteer' | 'organizer' | 'admin';

// Define the User interface
export interface User {
    userId: number;
    firstName: string;
    lastName: string;
    email: string;
    passwordHash: string;
    role: UserRole;
    lastLogin?: Date;
    organizationId?: number | null; // Nullable, only required for organizers
    createdAt: Date;
    updatedAt: Date;
}
