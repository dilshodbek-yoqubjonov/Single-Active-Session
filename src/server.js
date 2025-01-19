import express from "express";

import jwt from "jsonwebtoken";

import Redis from "ioredis";

import dotenv from "dotenv";
import { sessionMiddleware } from "./middleware/session.middleware.js";

dotenv.config();

const redis = new Redis();

const SECRET_KEY = process.env.SECRET_KEY;
console.log(SECRET_KEY);

const app = express();

app.use(express.json());

app.post("/login", async (req, res) => {
  const { username, password } = req.body;

  const user = { id: 1, username: "test_user" };

  if (username === user.username && password === "strong_password") {
    const token = jwt.sign(
      {
        id: user.id,
        username: user.username,
      },
      SECRET_KEY
    );

    await redis.set(`user:${user.id}`, token);

    return res.json({ token });
  }
});

app.get("/test", sessionMiddleware, (req, res) => {
  res.json({
    success: true,
    message: "Only You in here",
  });
});

app.listen(5000, () => {
  console.log("Server started on port 5000");
});
