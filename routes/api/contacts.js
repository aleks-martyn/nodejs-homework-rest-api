const express = require("express");

const contacts = require("../../models/contacts");

const { HttpError } = require("../../helpers");

const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    res.json(await contacts.listContacts());
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

router.get("/:contactId", async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const result = await contacts.getContactById(contactId);
    if (!result) {
      throw HttpError(404, "Not found");
    }
    res.json(result);
  } catch (error) {
    const { status = 500, message = "Server error" } = error;
    res.status(status).json({ message });
  }
});

router.post("/", async (req, res, next) => {
  res.json({ message: "template message" });
});

router.delete("/:contactId", async (req, res, next) => {
  res.json({ message: "template message" });
});

router.put("/:contactId", async (req, res, next) => {
  res.json({ message: "template message" });
});

module.exports = router;
