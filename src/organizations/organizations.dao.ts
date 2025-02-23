import { OkPacket } from 'mysql';
import { execute } from '../services/mysql.connector';
import { Organization } from './organizations.model';
import { organizationQueries } from './organizations.queries';

// Fetch all organizations from the database
export const readOrganizations = async () => {
    return execute<Organization[]>(organizationQueries.readOrganizations, []);
};

// Fetch a specific organization by ID
export const readOrganizationById = async (organizationId: number) => {
    return execute<Organization[]>(organizationQueries.readOrganizationById, [organizationId]);
};

// Create a new organization
export const createOrganization = async (organization: Organization) => {
    return execute<OkPacket>(organizationQueries.createOrganization, [
        organization.name, organization.description, organization.contactEmail,
        organization.contactPhone, organization.website
    ]);
};

// Update an existing organization
export const updateOrganization = async (organization: Organization) => {
    return execute<OkPacket>(organizationQueries.updateOrganization, [
        organization.name, organization.description, organization.contactEmail,
        organization.contactPhone, organization.website, organization.organizationId
    ]);
};

// Delete an organization from the database
export const deleteOrganization = async (organizationId: number) => {
    return execute<OkPacket>(organizationQueries.deleteOrganization, [organizationId]);
};
