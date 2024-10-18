import express from 'express';
import { loginUser } from '../controllers/authController';

const authRouter = express.Router();

// POST /auth/login - Create authentication token
authRouter.post('/auth/login', loginUser);

export default authRouter;