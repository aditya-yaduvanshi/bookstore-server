import mongoose, { CallbackError } from "mongoose";
import { createHash } from "@/lib/bcrypt";
import { User } from "@/types/auth";

const UserSchema = new mongoose.Schema<User>(
  {
    name: {
      type: String,
      required: true,
      minLength: 4,
      maxLength: 64,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      minLength: 5,
    },
    password: String,
  },
  { timestamps: true }
);

UserSchema.pre("save", async function (next) {
  try {
    this.password = await createHash(this.password);
    next();
  } catch (err) {
    console.log("pre save:", err);
    next(err as CallbackError);
  }
});

UserSchema.pre(
  "updateOne",
  { document: true, query: false },
  async function (next) {
    try {
      if (this.isModified("password"))
        this.password = await createHash(this.password);

      next();
    } catch (err) {
      console.log("pre update one:", err);
      next(err as CallbackError);
    }
  }
);

const UserModel = mongoose.model("users", UserSchema);

export default UserModel;
