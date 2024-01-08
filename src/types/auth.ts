import { JwtPayload } from "jsonwebtoken";
import { Request } from "express";

export interface User {
  _id: string;
  name: string;
  email: string;
  password: string;
}

export interface Payload extends JwtPayload {
  user: Pick<User, "_id" | "email" | "name">;
}

export interface AuthRequest extends Request {
  user?: Payload["user"];
}
