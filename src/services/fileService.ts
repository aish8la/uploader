import type { User } from "../schemas/user.schema.js";
import { prisma } from "../configs/prisma.js";

export const saveDirectory = async (
  userId: User["id"],
  folderName: string,
  parentId?: string,
) => {
  try {
    const folder = await prisma.folder.create({
      data: {
        name: folderName,
        ownerId: userId,
        parentId: parentId ? parentId : null,
      },
    });

    if (!folder) return false;

    return folder;
  } catch {
    return false;
  }
};

export const getFileList = async (ownerId: User["id"], dirId?: string) => {
  return await prisma.file.findMany({
    where: {
      ownerId: ownerId,
      folderId: dirId ? dirId : null,
    },
  });
};

export const getFolderList = async (ownerId: User["id"], dirId?: string) => {
  return await prisma.folder.findMany({
    where: {
      ownerId: ownerId,
      parentId: dirId ? dirId : null,
    },
  });
};
