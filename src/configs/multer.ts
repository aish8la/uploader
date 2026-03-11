import multer from "multer";
import * as fs from "fs/promises";
import * as path from "path";
import * as storagePath from "../configs/storage.js";

const storage = multer.diskStorage({
  destination: async (req, file, cb) => {
    if (!req.user?.id) {
      return cb(new Error("User needs to be logged in"), "");
    }

    const filePath = path.join(
      storagePath.STORAGE_ROOT,
      req.user.id.toString(),
    );

    try {
      await fs.mkdir(filePath, { recursive: true });
    } catch (error) {
      return cb(error as Error, "");
    }

    cb(null, filePath);
  },
  filename: (req, file, cb) => {
    if (!req.user?.id) {
      return cb(new Error("User needs to be logged in"), "");
    }

    const name =
      req.user.id.toString() +
      "_" +
      Date.now().toString() +
      path.extname(file.originalname);
    cb(null, name);
  },
});

export const upload = multer({
  storage: storage,
  limits: {
    fileSize: 3 * 1024 * 1024,
    files: 5,
  },
});
