import { prisma } from "../configs/prisma.js";
import type { NewUserOutput, User } from "../schemas/validation.schema.js";

export const getSafeUser = async (id: User["id"]) => {
  return await prisma.user.findFirst({
    where: {
      id: id,
    },
    omit: {
      password: true,
    },
  });
};

export const getUserByEmail = async (email: User["email"]) => {
  return await prisma.user.findFirst({
    where: {
      email: email,
    },
  });
};

export const postNewUser = async (user: NewUserOutput) => {
  return await prisma.user.create({
    data: user,
  });
};
