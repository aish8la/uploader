import express from "express";
import * as fileServices from "../services/fileService.js";

export const getFileUpload: express.RequestHandler = (req, res) => {
  const uploadLink =
    "/my-drive/upload" + req.params.folderId ? req.params.folderId : "";
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

export const createMultiFileRecord: express.RequestHandler = (req, res) => {
  if (!req.user?.id) {
    return res.redirect("auth/login");
  }

  if (!req.files?.length) {
    return res.redirect("/my-drive/upload"); // TODO: add proper error handling
  }

  fileServices.saveMultiFilesRecord(
    req.user.id,
    req.files as Express.Multer.File[],
    req.params.folderId,
  );

  res.redirect("/my-drive"); // TODO: Change this to redirect user to last folder
};
