import express from "express";
const router: express.Router = express.Router();
import indexRouter from "./routes/index.js";

router.use("/", indexRouter);

export default router;
