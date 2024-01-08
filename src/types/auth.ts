import { JwtPayload } from "jsonwebtoken";
import { User } from "@/models/users.model";
import { Request } from "express";

export interface Payload extends JwtPayload {
  user: Pick<User, "_id" | "email" | "name">;
}

export interface AuthRequest extends Request {
  user?: Payload["user"];
}
