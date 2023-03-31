import { RequestHandler } from "express";

const requireUser: RequestHandler = (req, res, next) => {
  try {
    const user = res.locals.user;
    if (!user)
      return res
        .status(401)
        .json({ success: false, message: "Please login first then try again" });
    next();
  } catch (error) {
    console.log(error);
    res
      .status(401)
      .json({ success: false, message: "Please login first then try again" });
  }
};

export default requireUser;
