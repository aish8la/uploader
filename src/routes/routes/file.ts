import express from "express";
import * as fileControllers from "../../controllers/files.js";
import { upload } from "../../configs/multer.js";
const router: express.Router = express.Router();

router
  .route("/upload")
  .get(fileControllers.getFileUpload)
  .post(upload.single("file"), (req, res) => {
    res.json("hi");
  });

export default router;
