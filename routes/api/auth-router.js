import express from "express";

import { validateBody } from "../../middlewares/index.js";

import usersSchemas from "../../schemas/users-schemas.js";

const authRouter = express.Router();

export default authRouter;