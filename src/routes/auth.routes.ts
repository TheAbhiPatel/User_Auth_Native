import express, { Router } from "express";
import {
  forgetPasswordEmail,
  loginUser,
  resendVerificationEmail,
  resetPassword,
  signupUser,
  verifyEmail,
} from "../controllers/authController";
import validate from "../middleware/validate";
import {
  forgetPasswordEmailSchema,
  loginUserSchema,
  resendVerificationEmailSchema,
  resetPasswordSchema,
  signupUserSchema,
  verifyEmailSchema,
} from "../validation/auth.schema";

const router: Router = express.Router();

router.post("/signup", validate(signupUserSchema), signupUser);

router.post("/login", validate(loginUserSchema), loginUser);

router.post("/verify-email", validate(verifyEmailSchema), verifyEmail);

router.post(
  "/resend-verification-email",
  validate(resendVerificationEmailSchema),
  resendVerificationEmail
);

router.post(
  "/forget-password-email",
  validate(forgetPasswordEmailSchema),
  forgetPasswordEmail
);

router.patch("/reset-password", validate(resetPasswordSchema), resetPassword);

export default router;
