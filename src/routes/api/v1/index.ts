import { Router } from "express";
import auth from "./auth";
import plan from "./plan";
import invite from "./invite";

const router = Router();

router.use("/auth", auth);

router.use("/plans", plan);

router.use("/invites", invite);

export default router;
