import express from "express";
import * as fileControllers from "../../controllers/files.js";
import { upload } from "../../configs/multer.js";
const router: express.Router = express.Router();

router.route("/").get(fileControllers.getRootDir);

router
  .route("/upload{/:folderId}")
  .get(fileControllers.getFileUpload)
  .post(upload.array("file", 5), fileControllers.createMultiFileRecord);

router.route("/folder{/:folderId}").get(fileControllers.getDirectory);

export default router;
