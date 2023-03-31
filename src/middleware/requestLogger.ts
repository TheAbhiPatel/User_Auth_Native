import { RequestHandler } from "express";
import requestModel from "../models/requestModel";

const requestLogger: RequestHandler = async (req, res, next) => {
  try {
    const url = req.url;
    const method = req.method;
    const ip = req.socket.remoteAddress;
    const userId = res.locals.user?.userId;

    res.on("finish", async () => {
      const newReq = await requestModel.create({
        url,
        method,
        ip,
        userId,
        statusCode: res.statusCode,
      });
    });

    next();
  } catch (error) {
    console.log(error);
    next();
  }
};

export default requestLogger;
