import express from 'express';
import { listUsers, createUser, modifyUser, deleteUser } from '../controllers/userController';
import authenticateToken from '../middleware/authenticateToken';

const userRouter = express.Router();

// GET /users - List users with pagination
userRouter.get('/users', authenticateToken, listUsers);

// POST /users - Create a user
userRouter.post('/users', createUser);

// PATCH /users/:uid - Modify a user
userRouter.patch('/users/:uid', authenticateToken, modifyUser);

// DELETE /users/:uid - Delete a user
userRouter.delete('/users/:uid', authenticateToken, deleteUser);

export { userRouter };