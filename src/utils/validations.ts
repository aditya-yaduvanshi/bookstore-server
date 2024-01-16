import joi from "joi";

export const SignupSchema = joi
  .object({
    name: joi
      .string()
      .required()
      .min(4)
      .max(64)
      .message("Name is required and must be between 4 to 64 characters."),
    email: joi
      .string()
      .email()
      .message("Email is required and must be valid email."),
    password: joi
      .string()
      .required()
      .alphanum()
      .min(6)
      .max(15)
      .message(
        "Password is required and should be alpha-numeric between 6 to 15 characters."
      ),
  })
  .required();

export const LoginSchema = joi
  .object({
    email: joi.string().email(),
    password: joi.string().required(),
  })
  .required();

export const PublishBookSchema = joi
  .object({
    title: joi.string().required().min(3).max(200),
    description: joi.string().max(2000),
    price: joi.number().min(0).max(9999999999).required(),
    cover: joi.string(),
    author: joi.string().required().min(4).max(64),
  })
  .required();
