import express from "express";
const router: express.Router = express.Router();
import indexRouter from "./routes/index.js";
import authRouter from "./routes/auth.js";
import fileRouter from "./routes/file.js";

router.use("/auth", authRouter);
router.use("/my-drive", fileRouter);

router.use("/", indexRouter);

export default router;
