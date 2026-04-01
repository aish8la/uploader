import express from "express";
import * as fileControllers from "../../controllers/files.js";
import { upload } from "../../configs/multer.js";
import {
  requireAuthentication,
  requireFolderAccess,
} from "../../middleware/auth.js";
import { validation } from "../../middleware/validation.js";
import {
  FolderIdSchema,
  FolderNameSchema,
} from "../../schemas/validation.schema.js";
const router: express.Router = express.Router();

router.use(requireAuthentication);

router.route("/").get(fileControllers.getRootDir);

router
  .route("/upload{/:folderId}")
  .all(
    validation({ paramSchema: FolderIdSchema }, "/my-drive/upload"),
    requireFolderAccess,
  )
  .get(fileControllers.getFileUpload)
  .post(upload.array("file", 5), fileControllers.createMultiFileRecord);

router
  .route("/new{/:folderId}")
  .all(
    validation({ paramSchema: FolderIdSchema }, "/my-drive/new"),
    requireFolderAccess,
  )
  .get(fileControllers.getCreateFolder)
  .post(
    validation(
      { bodySchema: FolderNameSchema, paramSchema: FolderIdSchema },
      "/my-drive/new",
    ),
    fileControllers.postCreateFolder,
  );

router
  .route("/folder{/:folderId}")
  .all(
    validation({ paramSchema: FolderIdSchema }, "/my-drive/folder"),
    requireFolderAccess,
  )
  .get(fileControllers.getDirectory);

router
  .route("/folder/:folderId/delete")
  .all(
    validation({ paramSchema: FolderIdSchema }, "/my-drive/folder"),
    requireFolderAccess,
  )
  .get(fileControllers.getDeleteFolder);

export default router;
