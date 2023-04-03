import { Request, Response } from "express";
import bcrypt from "bcrypt";
import userModel from "../models/user.model";
import jwt, { JsonWebTokenError } from "jsonwebtoken";
import { JWT_SECRET_FOR_LOGIN } from "../config";
import sendEmail from "../utils/sendEmail";

export const signupUser = async (req: Request, res: Response) => {
  const { firstName, lastName, email, password } = req.body;
  try {
    const user = await userModel.findOne({ email });
    if (user)
      return res
        .status(403)
        .json({ success: false, message: "User registered already." });
    const hashPass = await bcrypt.hash(password, 10);
    const vCode = Math.ceil(Math.random() * 1000000);
    const newUser = await userModel.create({
      firstName,
      lastName,
      email,
      password: hashPass,
      vCode,
    });
    const previewUrl = await sendEmail(firstName, email, vCode, true);
    if (previewUrl == undefined)
      return res
        .status(500)
        .json({ success: false, message: "Email not sent, please try again" });
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
  const { email, vCode } = req.body;
  try {
    const user = await userModel.findOne({ email });
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
    if (user.vCode != vCode)
      return res.status(403).json({
        success: false,
        message: "Invalid verification code",
      });
    user.isVerified = true;
    user.vCode = 0;
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
    const vCode = Math.ceil(Math.random() * 1000000);
    user.vCode = vCode;
    await user.save();

    const previewUrl = await sendEmail(user.firstName, email, vCode, true);
    console.log("previewUrl ------ ", previewUrl);

    if (previewUrl == undefined)
      return res
        .status(500)
        .json({ success: false, message: "Email not sent, please try again" });

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
    const fCode = Math.ceil(Math.random() * 1000000);
    user.fCode = fCode;
    await user.save();

    const previewUrl = await sendEmail(user.firstName, email, fCode, false);

    if (previewUrl == undefined)
      return res
        .status(500)
        .json({ success: false, message: "Email not sent, please try again" });

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
  const { email, password, fCode } = req.body;
  try {
    const user = await userModel.findOne({ email });
    if (!user)
      return res.status(404).json({
        success: false,
        message: "User not found.",
      });
    if (user.fCode != fCode)
      return res.status(403).json({
        success: false,
        message: "Invalid forget password code",
      });
    const hashPass = await bcrypt.hash(password, 10);
    user.password = hashPass;
    user.fCode = 0;
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
