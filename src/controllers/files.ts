import express from "express";
import * as fileServices from "../services/fileService.js";

export const getFileUpload: express.RequestHandler = (req, res) => {
  const uploadLink = req.params.folderId
    ? `/my-drive/upload/${req.params.folderId}`
    : "/my-drive/upload";
  res.render("file/upload", { uploadLink });
};

export const getRootDir: express.RequestHandler = async (req, res) => {
  if (!req.user?.id) {
    res.redirect("auth/login");
    return;
  }
  const folderList = await fileServices.getFolderList(req.user.id);
  const fileList = await fileServices.getFileList(req.user.id);
  res.render("file/list", { folders: folderList, files: fileList });
};

export const getDirectory: express.RequestHandler = async (req, res) => {
  if (!req.user?.id) {
    res.redirect("auth/login");
    return;
  }
  const folderList = await fileServices.getFolderList(
    req.user.id,
    req.params.folderId,
  );
  const fileList = await fileServices.getFileList(
    req.user.id,
    req.params.folderId,
  );
  res.render("file/list", { folders: folderList, files: fileList });
};

export const createMultiFileRecord: express.RequestHandler = async (
  req,
  res,
) => {
  if (!req.user?.id) {
    return res.redirect("auth/login");
  }

  if (!req.files?.length) {
    return res.redirect("/my-drive/upload"); // TODO: add proper error handling
  }

  await fileServices.saveMultiFilesRecord(
    req.user.id,
    req.files as Express.Multer.File[],
    req.params.folderId,
  );

  res.redirect("/my-drive"); // TODO: Change this to redirect user to last folder
};

// TODO: Extend Express.User with your user fields and create AuthenticatedRequest with non-optional user. Create AuthRequestHandler type for controllers. Add requireAuth middleware and apply it at the router level on all protected routers.
// TODO: return to previous folder after operations
// TODO: Create requireFolderAccess middleware checking req.params.folderId — verify folder exists and ownerId matches req.user.id, 403 on failure, next() on success. Same for requireFileAccess with req.params.fileId. Apply both at the router level via router.use() on parameterised routes.
