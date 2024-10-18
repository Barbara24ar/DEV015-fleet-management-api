import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { findUserByEmail } from '../repositories/userRepository';

export const loginUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: 'Email or password not provided' });
  }

  try {
    const user = await findUserByEmail(email);

    if (!user || user.password !== password) {
      return res.status(404).json({ error: 'Invalid credentials' });
    }

    // Create JWT Token
    const token = jwt.sign({ userId: user.id, email: user.email }, 'SECRET_KEY', {
      expiresIn: '1h',
    });

    res.json({
      accessToken: token,
      user: {
        id: user.id,
        email: user.email,
      },
    });
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).json({ error: 'Server error' });
  }
};