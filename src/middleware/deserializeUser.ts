import { RequestHandler } from "express";
import { JWT_SECRET_FOR_LOGIN } from "../config";
import { verifyJwt } from "../utils/verifyJwt";

const deserializeUser: RequestHandler = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];

  try {
    if (!token) return next();
    const decoded = verifyJwt(token, JWT_SECRET_FOR_LOGIN);
    if (!decoded) return next();
    res.locals.user = decoded;
    next();
  } catch (error) {
    console.log(error);
    next();
  }
};

export default deserializeUser;
