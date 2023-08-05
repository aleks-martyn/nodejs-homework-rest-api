import mongoose from "mongoose";
import request from "supertest";
import "dotenv/config";

import app from "../../app.js";

const { PORT, DB_HOST_TEST } = process.env;

describe("test signin route", () => {
  let server = null;
  beforeAll(async () => {
    await mongoose.connect(DB_HOST_TEST);
    server = app.listen(PORT);
  });

  afterAll(async () => {
    await mongoose.connection.close();
    server.close();
  });

  test("test signin with correct data", async () => {
    const signinData = {
      email: "m.polo@vest.net",
      password: "Major2020",
    };
    const { statusCode, body } = await request(app)
      .post("/auth/api/signin")
      .send(signinData);

    expect(statusCode).toBe(200);
    expect(body.user.email).toBe(signinData.email);
  });
});
