import type { User } from "../schemas/validation.schema.js";
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

export const saveMultiFilesRecord = async (
  ownerId: User["id"],
  fileArray: Express.Multer.File[],
  dirId?: string,
) => {
  const transformedFileArray = fileArray.map((file) => {
    return {
      displayName: file.originalname,
      ownerId: ownerId,
      folderId: dirId ? dirId : null,
      size: file.size,
      mimeType: file.mimetype,
      fileName: file.filename,
      destination: file.destination,
    };
  });
  return await prisma.file.createMany({
    data: transformedFileArray,
  });
};

export const getFolder = async (ownerId: User["id"], folderId: string) => {
  return await prisma.folder.findFirst({
    where: {
      id: folderId,
      ownerId: ownerId,
    },
  });
};
