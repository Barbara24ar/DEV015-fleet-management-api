import { Request, Response } from 'express';
import { getUsers, addUser, updateUser, removeUser } from '../services/userService';

export const listUsers = async (req: Request, res: Response) => {
  const { page = '1', limit = '10' } = req.query;

  // Validar si 'page' y 'limit' son números válidos
  const pageNumber = parseInt(page as string);
  const limitNumber = parseInt(limit as string);

  if (isNaN(pageNumber) || isNaN(limitNumber) || pageNumber < 1 || limitNumber < 1) {
    // Retornar un error 400 si los valores de página o límite no son válidos
    return res.status(400).json({ error: 'Invalid page or limit parameter' });
  }

  try {
    const users = await getUsers(pageNumber, limitNumber);
    res.json(users);
  } catch (error) {
    console.error('Error listing users:', error);
    res.status(500).json({ error: 'Server error' });
  }
};


export const createUser = async (req: Request, res: Response) => {
  const { name, email, password } = req.body;

  // Validar que los campos obligatorios estén presentes
  if (!name || !email || !password) {
    return res.status(400).json({ error: 'Missing required fields: name, email, or password' });
  }

  try {
    const newUser = await addUser(name, email, password);

    res.statusCode = 201;
    res.statusMessage = 'CREATED';

    // Responder con código 201 y un cuerpo que contenga el estado 'CREATED' y los datos del usuario
    res.json({
      id: newUser.id,
      name: newUser.name,
      email: newUser.email
    });
  } catch (error: any) {
    if (error.message === 'EMAIL_ALREADY_EXISTS') {
      // Si el email ya existe, devolver un 409 con el mensaje de error
      return res.status(409).json({ error: 'User with this email already exists' });
    }

    // Manejo de otros errores (500 por ejemplo)
    console.error('Error creating user:', error);
    res.status(500).json({ error: 'Server error' });
  }
};

export const modifyUser = async (req: Request, res: Response) => {
  const { uid } = req.params;
  const { name } = req.body;

  try {
    const updatedUser = await updateUser(uid, name);
    res.json(updatedUser);
  } catch (error) {
    console.error('Error modifying user:', error);
    res.status(404).json({ error: 'User not found' });
  }
};

export const deleteUser = async (req: Request, res: Response) => {
  const { uid } = req.params;

  try {
    const deletedUser = await removeUser(uid);
    res.json(deletedUser);
  } catch (error) {
    console.error('Error deleting user:', error);
    res.status(404).json({ error: 'User not found' });
  }
};