import { prisma } from "../configs/prisma.js";
import type { IUser } from "../types/global.js";

export const getSafeUser = async (id: IUser["id"]) => {
  return await prisma.user.findFirst({
    where: {
      id: id,
    },
    omit: {
      password: true,
    },
  });
};

export const getUserByEmail = async (email: IUser["email"]) => {
  return await prisma.user.findFirst({
    where: {
      email: email,
    },
  });
};
