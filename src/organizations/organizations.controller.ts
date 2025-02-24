import { Request, RequestHandler, Response } from 'express';
import { OkPacket } from 'mysql';
import * as OrganizationsDao from './organizations.dao';

// Handler to fetch all organizations
export const readOrganizations: RequestHandler = async (req: Request, res: Response) => {
    try {
        const organizations = await OrganizationsDao.readOrganizations();
        res.status(200).json(organizations);
    } catch (error) {
        console.error('[organizations.controller][readOrganizations][Error] ', error);
        res.status(500).json({
            message: 'There was an error fetching organizations'
        });
    }
};

// Handler to fetch an organization by ID
export const readOrganizationById: RequestHandler = async (req: Request, res: Response) => {
    try {
        const organizationId = parseInt(req.params.organizationId);
        const organization = await OrganizationsDao.readOrganizationById(organizationId);
        res.status(200).json(organization);
    } catch (error) {
        console.error('[organizations.controller][readOrganizationById][Error] ', error);
        res.status(500).json({
            message: 'There was an error fetching the organization'
        });
    }
};

// Handler to create a new organization
export const createOrganization: RequestHandler = async (req: Request, res: Response) => {
    try {
        const okPacket: OkPacket = await OrganizationsDao.createOrganization(req.body);
        res.status(201).json(okPacket);
    } catch (error: any) {
        console.error('[organizations.controller][createOrganization][Error] ', error);

        // Handle duplicate organization name error
        if (error.code === 'ER_DUP_ENTRY') {
            res.status(400).json({
                message: 'An organization with this name already exists'
            });
            return;
        }

        res.status(500).json({
            message: 'There was an error creating the organization'
        });
    }
};

// Handler to update an existing organization
export const updateOrganization: RequestHandler = async (req: Request, res: Response) => {
    try {
        const okPacket: OkPacket = await OrganizationsDao.updateOrganization(req.body);
        res.status(200).json(okPacket);
    } catch (error: any) {
        console.error('[organizations.controller][updateOrganization][Error] ', error);

        // Handle duplicate organization name error
        if (error.code === 'ER_DUP_ENTRY') {
            res.status(400).json({
                message: 'An organization with this name already exists'
            });
            return;
        }

        res.status(500).json({
            message: 'There was an error updating the organization'
        });
    }
};

// Handler to delete an organization
export const deleteOrganization: RequestHandler = async (req: Request, res: Response) => {
    try {
        const organizationId = parseInt(req.params.organizationId);
        const response = await OrganizationsDao.deleteOrganization(organizationId);
        res.status(200).json(response);
    } catch (error) {
        console.error('[organizations.controller][deleteOrganization][Error] ', error);
        res.status(500).json({
            message: 'There was an error deleting the organization'
        });
    }
};
