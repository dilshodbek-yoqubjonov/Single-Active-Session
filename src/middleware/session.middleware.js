import jwt from "jsonwebtoken";

import Redis from "ioredis";
import dotenv from "dotenv";

dotenv.config();
const redis = new Redis();

const SECRET_KEY = process.env.SECRET_KEY;

export const sessionMiddleware = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    const token = authHeader.split(" ")[1];

    const decode = jwt.verify(token, SECRET_KEY);

    const storedToken = await redis.get(`user:${decode.id}`);

    if (storedToken !== token) {
      return res.send({
        success: false,
        message: "User already logined",
      });
    }

    req.user = decode;

    next();
  } catch (error) {
    return res.status(401).send({
      success: false,
      message: "Invalid token",
    });
  }
};
