import zod, { number, object, string, TypeOf } from "zod";

export const signupUserSchema = object({
  body: object({
    firstName: string({ required_error: "'firstName' is required." }),
    lastName: string({ required_error: "'lastName' is required." }),
    email: string({ required_error: "'email' is required." }).email(
      "email is not valid"
    ),
    password: string({ required_error: "'password' is required." }).min(
      6,
      "password must be at least 6 character long."
    ),
  }),
});
export const loginUserSchema = object({
  body: object({
    email: string({ required_error: "'email' is required." }).email(
      "email is not valid"
    ),
    password: string({ required_error: "'password' is required." }),
  }),
});
export const verifyEmailSchema = object({
  body: object({
    vCode: number({ required_error: "'vCode' is required." }),
  }),
});
export const resendVerificationEmailSchema = object({
  body: object({
    email: string({ required_error: "'email' is required." }).email(
      "email is not valid"
    ),
  }),
});
export const forgetPasswordEmailSchema = object({
  body: object({
    email: string({ required_error: "'email' is required." }).email(
      "email is not valid"
    ),
  }),
});
export const resetPasswordSchema = object({
  body: object({
    password: string({ required_error: "'password' is required." }).min(
      6,
      "password must be at least 6 character long."
    ),
    fCode: number({ required_error: "'fCode' is required." }),
  }),
});
