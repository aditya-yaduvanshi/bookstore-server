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
      .pattern(
        new RegExp(
          "^(?=.*d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*s).{6,15}$"
        )
      )
      .message(
        "Password is required and must contain atleast one number, one lowercase, one uppercase and one special character and between 6 to 15 characters."
      ),
  })
  .required();