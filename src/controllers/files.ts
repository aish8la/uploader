import express from "express";
import * as fileServices from "../services/fileService.js";

export const getFileUpload: express.RequestHandler = (req, res) => {
  res.render("file/upload");
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
