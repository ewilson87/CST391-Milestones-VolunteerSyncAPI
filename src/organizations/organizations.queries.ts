export const organizationQueries = {
    // Query to fetch all organizations
    readOrganizations: `
        SELECT 
            organization_id AS organizationId, name, description, 
            contact_email AS contactEmail, contact_phone AS contactPhone, 
            website, created_at AS createdAt, updated_at AS updatedAt
        FROM volunteersync.organizations
    `,

    // Query to fetch a specific organization by ID
    readOrganizationById: `
        SELECT 
            organization_id AS organizationId, name, description, 
            contact_email AS contactEmail, contact_phone AS contactPhone, 
            website, created_at AS createdAt, updated_at AS updatedAt
        FROM volunteersync.organizations
        WHERE organization_id = ?
    `,

    // Query to fetch a specific organization by name
    readOrganizationByName: `
        SELECT 
            organization_id AS organizationId, name, description, 
            contact_email AS contactEmail, contact_phone AS contactPhone, 
            website, created_at AS createdAt, updated_at AS updatedAt
        FROM volunteersync.organizations
        WHERE name = ?
    `,

    // Query to insert a new organization
    createOrganization: `
        INSERT INTO volunteersync.organizations 
            (name, description, contact_email, contact_phone, website)
        VALUES (?, ?, ?, ?, ?)
    `,

    // Query to update an existing organization
    updateOrganization: `
        UPDATE volunteersync.organizations
        SET name = ?, description = ?, contact_email = ?, 
            contact_phone = ?, website = ?, updated_at = NOW()
        WHERE organization_id = ?
    `,

    // Query to delete an organization
    deleteOrganization: `
        DELETE FROM volunteersync.organizations
        WHERE organization_id = ?
    `
};
