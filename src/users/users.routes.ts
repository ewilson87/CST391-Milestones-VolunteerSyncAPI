import { Router } from 'express';
import * as UsersController from './users.controller';

const router = Router();

// GET /users - Retrieve all users (Admin only)
router.
    route('/users').
    get(UsersController.readUsers);

// GET /users/:userId - Retrieve a specific user by ID
router.
    route('/users/:userId').
    get(UsersController.readUserById);

// GET /users/email/:email - Retrieve a user by email (For authentication)
router.
    route('/users/email/:email').
    get(UsersController.readUserByEmail);

// POST /users/register - Register a new user
router.
    route('/users/register').
    post(UsersController.createUser);

// PUT /users - Update an existing user
router.
    route('/users').
    put(UsersController.updateUser);

// DELETE /users/:userId - Delete a user (Admin only)
router.
    route('/users/:userId').
    delete(UsersController.deleteUser);

export default router;
