import { Request, Response } from "express";
import UserModel, { User } from "@/models/users.model";
import { SignupSchema } from "@/utils/validations";
import { createAccessKey } from "@/lib/jwt";

export const signup = async (req: Request, res: Response) => {
  try {
    const body = req.body as Omit<User, "_id">;
    const { error } = SignupSchema.validate(body);
    if (error) return res.status(400).json({ error: error.message });

    const isEmailExists = await UserModel.exists({ email: body.email });
    if (isEmailExists)
      return res.status(400).json({ error: "Email already exists!" });

    const user = await UserModel.create({
      name: body.name,
      email: body.email,
      password: body.password,
    });

    if (!user)
      return res.status(500).json({
        error: "Cannot signup at the moment. Please try again later.",
      });

    const accessToken = await createAccessKey({
      user: {
        name: user.name,
        email: user.email,
        _id: user._id,
      },
    });

    return res.json({ data: { accessToken }, error: null });
  } catch (err) {
    console.log("Signup error:", err);
    return res.status(500).json({ error: "Something went wrong!" });
  }
};
