import { Response, NextFunction } from "express";
import { verifyAccessKey } from "@/lib/jwt";
import { AuthRequest } from "@/types/auth";

export const isAuth = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.headers.authorization?.split("Bearer ")?.[1];
    if (!token) return res.status(401).json({ error: "Invalid token!" });
    const { user } = await verifyAccessKey(token);
    req.user = user;
    next();
  } catch (err) {
    console.log("Auth middleware error:", err);
    return res.status(400).json({ error: (err as Error).message });
  }
};
