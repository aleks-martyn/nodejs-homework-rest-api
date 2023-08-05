import Jimp from "jimp";
import path from "path";

import { ctrlWrapper } from "../decorators/index.js";

const resizeAvatar = async (req, res, next) => {
  const { path: tempPath, filename } = req.file;

  const image = await Jimp.read(tempPath);
  image.resize(250, 250);

  const resizedDest = path.resolve("temp");
  const resultResizedPath = path.join(resizedDest, filename);

  await image.writeAsync(resultResizedPath);
  next();
};

export default ctrlWrapper(resizeAvatar);
