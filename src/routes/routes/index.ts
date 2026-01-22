import express from "express";
import * as controller from "../../controllers/index.js";
const router: express.Router = express.Router();

router.get("/", controller.getRoot);

export default router;
