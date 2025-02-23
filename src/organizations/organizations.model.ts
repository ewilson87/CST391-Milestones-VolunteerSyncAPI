// Define the Organization interface
export interface Organization {
    organizationId: number;
    name: string;
    description?: string;
    contactEmail: string;
    contactPhone?: string;
    website?: string;
    createdAt: Date;
    updatedAt: Date;
}
