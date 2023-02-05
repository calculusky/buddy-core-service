import { Router } from "express";

import * as Check from "@/middlewares/schema";

import * as AuthController from "@/controllers/auth";

import * as AuthService from "@/services/auth";

const router = Router();

router.post(
    "/register",
    Check.body(AuthService.Schema.RegistrationSchema),
    AuthController.register
);

router.post(
    "/login",
    Check.body(AuthService.Schema.LoginSchema),
    AuthController.login
);

export default router;
