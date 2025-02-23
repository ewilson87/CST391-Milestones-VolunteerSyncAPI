import { Router } from 'express';
import * as OrganizationsController from './organizations.controller';

const router = Router();

// GET /organizations - Retrieve all organizations
router.
    route('/organizations').
    get(OrganizationsController.readOrganizations);

// GET /organizations/:organizationId - Retrieve a specific organization by ID
router.
    route('/organizations/:organizationId').
    get(OrganizationsController.readOrganizationById);

// POST /organizations - Create a new organization
router.
    route('/organizations').
    post(OrganizationsController.createOrganization);

// PUT /organizations - Update an existing organization
router.
    route('/organizations').
    put(OrganizationsController.updateOrganization);

// DELETE /organizations/:organizationId - Delete an organization
router.
    route('/organizations/:organizationId').
    delete(OrganizationsController.deleteOrganization);

export default router;
