import prisma from '../client';

export const findUserByEmail = async (email: string) => {
  return await prisma.users.findUnique({
    where: { email },
  });
};

export const findUsers = async (page: number, limit: number) => {
  return await prisma.users.findMany({
    skip: (page - 1) * limit,
    take: limit,
    select: {
      id: true,
      name: true,
      email: true,
    },
  });
};

export const createUserInDb = async (name: string, email: string, password: string) => {
  return await prisma.users.create({
    data: {
      name,
      email,
      password,
    },
  });
};

export const updateUserInDb = async (uid: string, name: string) => {
  return await prisma.users.update({
    where: {
      id: parseInt(uid) || undefined,
      email: isNaN(parseInt(uid)) ? uid : undefined,
    },
    data: {
      name,
    },
  });
};

export const deleteUserInDb = async (uid: string) => {
    return await prisma.users.delete({
      where: {
        id: parseInt(uid) || undefined,
        email: isNaN(parseInt(uid)) ? uid : undefined,
      },
    });
  };
  