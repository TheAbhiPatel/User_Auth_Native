import express, { Router } from "express";
import requireUser from "../middleware/requireUser";
import authRoutes from "./auth.routes";
import userRotues from "./user.routes";

const router: Router = express.Router();

router.use("/auth", authRoutes);
// router.use("/user", requireUser, userRotues);

export default router;
