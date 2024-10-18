import { findUsers, createUserInDb, updateUserInDb, deleteUserInDb, findUserByEmail } from '../repositories/userRepository';

export const getUsers = async (page: number, limit: number) => {
  return await findUsers(page, limit);
};

export const addUser = async (name: string, email: string, password: string) => {
  // Verificar si el usuario con este email ya existe
  const existingUser = await findUserByEmail(email);

  if (existingUser) {
    // Si el usuario ya existe, lanzar un error personalizado
    throw new Error('EMAIL_ALREADY_EXISTS');
  }

  // Si no existe, crear el usuario
  return await createUserInDb(name, email, password);
};

export const updateUser = async (uid: string, name: string) => {
  return await updateUserInDb(uid, name);
};

export const removeUser = async (uid: string) => {
  return await deleteUserInDb(uid);
};