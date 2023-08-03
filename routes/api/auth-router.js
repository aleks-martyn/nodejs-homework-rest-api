import express from "express";

import authController from "../../controllers/auth-controller.js";

import { validateBody, upload } from "../../middlewares/index.js";

import usersSchemas from "../../schemas/users-schemas.js";

import { authenticate } from "../../middlewares/index.js";

const authRouter = express.Router();

authRouter.post(
  "/signup",
  validateBody(usersSchemas.userSignupSchema),
  authController.signup
);

authRouter.post(
  "/signin",
  validateBody(usersSchemas.userSigninSchema),
  authController.signin
);

authRouter.get("/current", authenticate, authController.getCurrent);

authRouter.patch(
  "/",
  authenticate,
  validateBody(usersSchemas.updateSubscriptionSchema),
  authController.updateSubscription
);

authRouter.patch("/avatars", authenticate, upload.single("avatar"), authController.updateAvatar);

authRouter.post("/signout", authenticate, authController.signout);

export default authRouter;
