import express from "express";

import contactsController from "../../controllers/contacts.js";

import { validateBody } from "../../middlewares/index.js";

import { isEmptyBody } from "../../middlewares/index.js";

import schemas from "../../schemas/contacts.js";

const contactsRouter = express.Router();

contactsRouter.get("/", contactsController.getAll);

contactsRouter.get("/:contactId", contactsController.getById);

contactsRouter.post(
  "/",
  isEmptyBody,
  validateBody(schemas.addSchema),
  contactsController.add
);

contactsRouter.put(
  "/:contactId",
  isEmptyBody,
  validateBody(schemas.addSchema),
  contactsController.updateById
);

contactsRouter.delete("/:contactId", contactsController.deleteById);

export default contactsRouter;
