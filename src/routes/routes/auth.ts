import express from "express";
import * as authControllers from "../../controllers/auth.js";
const router: express.Router = express.Router();

router.route("/login").get(authControllers.getLogin);
router
  .route("/signup")
  .get(authControllers.getSignup)
  .post(authControllers.postSignup);

export default router;
