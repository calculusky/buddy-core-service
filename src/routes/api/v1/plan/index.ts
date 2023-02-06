import { Router } from "express";

import * as Check from "@/middlewares/schema";

import * as PlanController from "@/controllers/plan";

import * as PlanService from "@/services/plan";

import * as Middleware from "@/middlewares";

const router = Router();

router.post(
    "/",
    Check.body(PlanService.Schema.CreatePlanSchema),
    Middleware.authenticate,
    PlanController.createPlan
);

export default router;
