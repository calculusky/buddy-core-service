import { ControllerWithUser } from "../interfaces";
import * as PlanService from "@/services/plan";
import { User } from "@/models/sql/User";

export const createPlan: ControllerWithUser<
    PlanService.CreatePlanOptions,
    User
> = async (req, res, next) => {
    try {
        const plan = await PlanService.createPlan(req.body, req.user);

        res.status(201).json({
            success: true,
            message: "Plan Successfully Created",
            data: {
                plan,
            },
        });
    } catch (err) {
        next(err);
    }
};
