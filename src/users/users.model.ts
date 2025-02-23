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
    createdAt: Date;
    updatedAt: Date;
}
