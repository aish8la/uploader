import path from "path";
import fs from "fs/promises";
import * as storage from "../configs/storage.js";
import type { User } from "../schemas/user.schema.js";
import { prisma } from "../configs/prisma.js";

const createFsDirectory = async (fullPath: string) => {
  try {
    await fs.mkdir(path.join(storage.STORAGE_ROOT, fullPath), {
      recursive: true,
    });
    return true;
  } catch {
    return false;
  }
};

const fsPathBuilder = (
  userId: User["id"],
  folderId: string,
  parentId?: string,
) => {
  return path.join(userId.toString(), parentId ? parentId : ".", folderId);
};

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

    const fsPath = fsPathBuilder(userId, folder.id, parentId);

    const success = await createFsDirectory(fsPath);

    if (!success) return false;

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
