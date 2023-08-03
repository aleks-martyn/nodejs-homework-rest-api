import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import gravatar from "gravatar";
import path from "path";
import fs from "fs/promises";

import User from "../models/user.js";

import { ctrlWrapper } from "../decorators/index.js";

import { HttpError } from "../helpers/index.js";

const { JWT_SECRET } = process.env;

const avatarsPath = path.resolve("public", "avatars");

const signup = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (user) {
    throw HttpError(409, "Email in use");
  }

  const hashPassword = await bcrypt.hash(password, 10);
  const avatarURL = gravatar.url(email);

  const newUser = await User.create({
    ...req.body,
    password: hashPassword,
    avatarURL,
  });

  res.status(201).json({
    name: newUser.name,
    email: newUser.email,
    subscription: newUser.subscription,
  });
};

const signin = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (!user) {
    throw HttpError(401, "Email or password is wrong");
  }

  const passwordCompare = await bcrypt.compare(password, user.password);

  if (!passwordCompare) {
    throw HttpError(401, "Email or password is wrong");
  }

  const payload = {
    id: user._id,
  };

  const token = jwt.sign(payload, JWT_SECRET, { expiresIn: "7d" });
  await User.findByIdAndUpdate(user._id, { token });

  res.json({
    token,
    user: {
      email: user.email,
      subscription: user.subscription,
    },
  });
};

const getCurrent = (req, res) => {
  const { name, email, subscription } = req.user;

  res.json({
    name,
    email,
    subscription,
  });
};

const updateSubscription = async (req, res) => {
  const { _id } = req.user;
  const { subscription } = req.body;
  await User.findByIdAndUpdate(_id, { subscription });

  res.json({
    message: `Your subscription has been changed to ${subscription}`,
  });
};

const updateAvatar = async (req, res) => {
  const { _id } = req.user;
  const { path: tempUpload, filename } = req.file;
  const resultUpload = path.join(avatarsPath, filename);
  await fs.rename(tempUpload, resultUpload);
  const avatarURL = path.join("avatars", filename);
  await User.findByIdAndUpdate(_id, { avatarURL });

  res.json({
    avatarURL,
  });
};

const signout = async (req, res) => {
  const { _id } = req.user;
  await User.findByIdAndUpdate(_id, { token: "" });

  res.status(204).json();
};

export default {
  signup: ctrlWrapper(signup),
  signin: ctrlWrapper(signin),
  getCurrent: ctrlWrapper(getCurrent),
  updateSubscription: ctrlWrapper(updateSubscription),
  updateAvatar: ctrlWrapper(updateAvatar),
  signout: ctrlWrapper(signout),
};
