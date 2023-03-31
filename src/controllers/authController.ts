import { Request, Response } from "express";
import bcrypt from "bcrypt";
import userModel from "../models/user.model";
import jwt, { JsonWebTokenError } from "jsonwebtoken";
import { JWT_SECRET_FOR_EMAIL, JWT_SECRET_FOR_LOGIN } from "../config";
import sendEmail from "../utils/sendEmail";
import { verifyJwt } from "../utils/verifyJwt";

export const signupUser = async (req: Request, res: Response) => {
  const { firstName, lastName, email, password } = req.body;
  try {
    const user = await userModel.findOne({ email });
    if (user)
      return res
        .status(403)
        .json({ success: false, message: "User registered already." });
    const hashPass = await bcrypt.hash(password, 10);
    const newUser = await userModel.create({
      firstName,
      lastName,
      email,
      password: hashPass,
    });
    const token = jwt.sign({ userId: newUser.id }, JWT_SECRET_FOR_EMAIL, {
      expiresIn: "15m",
    });
    const previewUrl = await sendEmail(firstName, email, token, true);
    res.status(201).json({
      success: true,
      message: "User registered successfully, Please verify your email.",
      previewUrl,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Something went wrong" });
  }
};

export const loginUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  try {
    const user = await userModel.findOne({ email });
    if (!user)
      return res.status(404).json({
        success: false,
        message: "User not registered, Please signup first",
      });
    if (user.isVerified == false)
      return res.status(403).json({
        success: false,
        message: "Please verify your email first",
      });
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(403).json({
        success: false,
        message: "Invalid password.",
      });
    const tokenData = {
      firstName: user.firstName,
      lastName: user.lastName,
      email: email,
      userId: user.id,
    };
    const token = jwt.sign(tokenData, JWT_SECRET_FOR_LOGIN, {
      expiresIn: "5d",
    });
    res
      .status(200)
      .json({ success: true, message: "User logged in successfully.", token });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Something went wrong" });
  }
};

export const verifyEmail = async (req: Request, res: Response) => {
  const { token } = req.query;
  try {
    if (!token)
      return res.status(404).json({
        success: false,
        message: "Verification token not found.",
      });
    const decoded = verifyJwt<{ userId: string }>(token, JWT_SECRET_FOR_EMAIL);
    if (!decoded)
      return res.status(401).json({
        success: false,
        message: "Invalid token.",
      });
    const user = await userModel.findById(decoded.userId);
    if (!user)
      return res.status(404).json({
        success: false,
        message: "User not found.",
      });
    if (user.isVerified == true)
      return res.status(403).json({
        success: false,
        message: "User already verified.",
      });
    user.isVerified = true;
    await user.save();
    res
      .status(200)
      .json({ success: true, message: "User verified successfully." });
  } catch (error) {
    if (error instanceof JsonWebTokenError) {
      res
        .status(400)
        .json({ success: false, message: "Invalid or expired token." });
    }
    console.log(error);
    res.status(500).json({ success: false, message: "Something went wrong" });
  }
};

export const resendVerificationEmail = async (req: Request, res: Response) => {
  const { email } = req.body;
  try {
    const user = await userModel.findOne({ email });
    if (!user)
      return res.status(404).json({
        success: false,
        message: "User not found, Please signup first",
      });
    if (user.isVerified == true)
      return res.status(403).json({
        success: false,
        message: "User already verified",
      });
    const token = jwt.sign({ userId: user.id }, JWT_SECRET_FOR_EMAIL, {
      expiresIn: "15m",
    });
    const previewUrl = await sendEmail(user.firstName, email, token, true);

    res.status(200).json({
      success: true,
      message: "Verification email resent  successfully.",
      previewUrl,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Something went wrong" });
  }
};

export const forgetPasswordEmail = async (req: Request, res: Response) => {
  const { email } = req.body;
  try {
    const user = await userModel.findOne({ email });
    if (!user)
      return res.status(404).json({
        success: false,
        message: "User not found, Please signup first.",
      });
    if (user.isVerified == false)
      return res.status(403).json({
        success: false,
        message: "User not verified, Please verify your email first.",
      });
    const token = jwt.sign({ userId: user.id }, JWT_SECRET_FOR_EMAIL, {
      expiresIn: "15m",
    });
    const previewUrl = await sendEmail(user.firstName, email, token, false);

    res.status(200).json({
      success: true,
      message: "Forget password email sent  successfully.",
      previewUrl,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Something went wrong" });
  }
};

export const resetPassword = async (req: Request, res: Response) => {
  const { token } = req.query;
  const { password } = req.body;
  try {
    if (!token)
      return res.status(404).json({
        success: false,
        message: "Verification token not found.",
      });
    const decoded = verifyJwt<{ userId: string }>(token, JWT_SECRET_FOR_EMAIL);
    if (!decoded)
      return res.status(401).json({
        success: false,
        message: "Invalid token.",
      });
    const user = await userModel.findById(decoded.userId);
    if (!user)
      return res.status(404).json({
        success: false,
        message: "User not found.",
      });
    const hashPass = await bcrypt.hash(password, 10);
    user.password = hashPass;
    await user.save();

    res.status(200).json({
      success: true,
      message: "Password reset  successfully.",
    });
  } catch (error) {
    if (error instanceof JsonWebTokenError) {
      res
        .status(400)
        .json({ success: false, message: "Invalid or expired token." });
    }
    console.log(error);
    res.status(500).json({ success: false, message: "Something went wrong" });
  }
};
// =======================================================
export const newFunc = async (req: Request, res: Response) => {
  try {
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Something went wrong" });
  }
};
