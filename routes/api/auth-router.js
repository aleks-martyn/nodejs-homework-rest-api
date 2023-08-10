import express from "express";

import authController from "../../controllers/auth-controller.js";

import { validateBody, upload, resizeAvatar } from "../../middlewares/index.js";

import usersSchemas from "../../schemas/users-schemas.js";

import { authenticate } from "../../middlewares/index.js";

const authRouter = express.Router();

authRouter.post(
  "/signup",
  validateBody(usersSchemas.userSignupSchema),
  authController.signup
);

authRouter.get("/verify/:verificationToken", authController.verifyEmail);

authRouter.post(
  "/verify",
  validateBody(usersSchemas.userEmailSchema),
  authController.resendVerifyEmail
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

authRouter.patch(
  "/avatars",
  authenticate,
  upload.single("avatar"),
  resizeAvatar,
  authController.updateAvatar
);

authRouter.post("/signout", authenticate, authController.signout);

export default authRouter;
