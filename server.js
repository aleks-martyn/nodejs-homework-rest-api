import mongoose from "mongoose";

import app from "./app.js";

const DB_HOST =
  "mongodb+srv://Oleksandr:ULW4RCMD6ES0CP7y@cluster0.r82o1ri.mongodb.net/db-contacts?retryWrites=true&w=majority";

mongoose.set("strictQuery", true);

mongoose
  .connect(DB_HOST)
  .then(() => {
    app.listen(3000, () => {
      console.log("Database connection successful");
    });
  })
  .catch((error) => {
    console.log(error.message);
    process.exit(1);
  });
