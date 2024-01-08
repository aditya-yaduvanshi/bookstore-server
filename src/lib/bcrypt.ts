import "dotenv/config";
import bcrypt from "bcrypt";

const SALT_ROUNDS = process.env.BCRYPT_SALT_ROUNDS || "10";

export const createHash = async (password: string) => {
  return await bcrypt.hash(password, Number(SALT_ROUNDS));
};

export const verifyHash = async (password: string, hash: string) => {
  return await bcrypt.compare(password, hash);
};
