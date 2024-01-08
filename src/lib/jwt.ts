import "dotenv/config";
import jwt from "jsonwebtoken";
import { Payload } from "@/types/auth";

const SECRET_KEY = process.env.JWT_SECRET_KEY || "secret_key";

export const createAccessKey = async (payload: Payload) => {
  return jwt.sign(payload, SECRET_KEY, {
    expiresIn: "1s",
  });
};

export const createRefreshKey = async (payload: Payload) => {
  return jwt.sign(payload, SECRET_KEY, {
    expiresIn: "7d",
  });
};

export const verifyAccessKey = async (accessKey: string) => {
  return jwt.verify(accessKey, SECRET_KEY) as Payload;
};

export const verifyRefreshKey = async (refreshKey: string) => {
  return jwt.verify(refreshKey, SECRET_KEY) as Payload;
};
