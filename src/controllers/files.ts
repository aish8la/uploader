import express from "express";
// import { upload } from "../configs/multer.js";

export const getFileUpload: express.RequestHandler = (req, res) => {
  res.render("file/upload");
};
