import express from "express";
import * as fileServices from "../services/fileService.js";
import type { AuthenticatedRequest, ValidatedInput } from "../types/global.js";
import type { FolderID, FolderName } from "../schemas/validation.schema.js";

export const getFileUpload: express.RequestHandler = (req, res) => {
  const uploadLink = req.params.folderId
    ? `/my-drive/upload/${req.params.folderId}`
    : "/my-drive/upload";
  res.render("file/upload", { uploadLink });
};

export const getRootDir: express.RequestHandler = async (req, res) => {
  const { user } = req as AuthenticatedRequest;

  const folderList = await fileServices.getFolderList(user.id);
  const fileList = await fileServices.getFileList(user.id);
  res.render("file/list", { folders: folderList, files: fileList });
};

export const getDirectory: express.RequestHandler = async (req, res) => {
  const { user } = req as AuthenticatedRequest;
  const folderList = await fileServices.getFolderList(
    user.id,
    req.params.folderId,
  );
  const fileList = await fileServices.getFileList(user.id, req.params.folderId);
  res.render("file/list", { folders: folderList, files: fileList });
};

export const createMultiFileRecord: express.RequestHandler = async (
  req,
  res,
) => {
  const { user } = req as AuthenticatedRequest;

  if (!req.files?.length) {
    return res.redirect("/my-drive/upload"); // TODO: add proper error handling
  }

  await fileServices.saveMultiFilesRecord(
    user.id,
    req.files as Express.Multer.File[],
    req.params.folderId,
  );

  res.redirect("/my-drive"); // TODO: Change this to redirect user to last folder
};

export const getCreateFolder: express.RequestHandler = (req, res) => {
  const createLink = req.params.folderId
    ? `/my-drive/new/${req.params.folderId}`
    : "/my-drive/new";
  res.render("file/new", { createLink });
};

export const postCreateFolder: express.RequestHandler = async (req, res) => {
  const { user } = req as AuthenticatedRequest;
  const { params, body } = req.validatedInput as ValidatedInput<
    FolderName,
    FolderID
  >;

  await fileServices.saveDirectory(user.id, body.folderName, params?.folderId);

  res.redirect("/my-drive");
};

// TODO: return to previous folder after operations
// TODO: Create requireFolderAccess middleware checking req.params.folderId — verify folder exists and ownerId matches req.user.id, 403 on failure, next() on success. Same for requireFileAccess with req.params.fileId. Apply both at the router level via router.use() on parameterised routes.
