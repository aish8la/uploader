import express from "express";
import * as authControllers from "../../controllers/auth.js";
import { validation } from "../../middleware/validation.js";
import { NewUserSchema } from "../../schemas/validation.schema.js";
const router: express.Router = express.Router();

router
  .route("/login")
  .get(authControllers.getLogin)
  .post(authControllers.postLogin);

router
  .route("/signup")
  .get(authControllers.getSignup)
  .post(
    validation({ bodySchema: NewUserSchema }, "/auth/signup"),
    authControllers.postSignup,
  );

router.route("/logout").get(authControllers.getLogout);

export default router;
