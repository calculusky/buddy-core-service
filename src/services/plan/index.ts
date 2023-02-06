import { Plan } from "@/models/sql/Plan";
import { User } from "@/models/sql/User";
import { randomBytes } from "crypto";
import { CreatePlanOptions } from "./interfaces";

export * from "./interfaces";
export * as Schema from "./schema";

export const createPlan = async (options: CreatePlanOptions, user: User) => {
    const plan = await Plan.create({
        title: options.title,
        userId: user.id,
        numberOfBuddies: options.numberOfBuddies,
        annualTargetAmount: options.annualTargetAmount || null,
        buddyRelationship: options.buddyRelationship,
        endDate: options.endDate,
        startDate: options.startDate,
        hasTarget: options.hasTarget,
        identifier: randomBytes(5).toString("hex"),
        savingFrequency: options.savingFrequency,
        savingMethod: options.savingMethod,
    });
    return plan;
};
