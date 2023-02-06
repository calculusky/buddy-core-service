import {
    BuddyRelationship,
    SavingFrequency,
    SavingMethod,
} from "@/models/sql/Plan";
import * as Yup from "yup";

import { CreatePlanOptions } from "./interfaces";

export const CreatePlanSchema: Yup.SchemaOf<CreatePlanOptions> =
    Yup.object().shape({
        title: Yup.string().required(),
        numberOfBuddies: Yup.number().max(5).required(),
        annualTargetAmount: Yup.number(),
        buddyRelationship: Yup.mixed<BuddyRelationship>()
            .oneOf(Object.values(BuddyRelationship))
            .required(),
        startDate: Yup.date().required(),
        endDate: Yup.date().required(),
        hasTarget: Yup.boolean(),
        savingFrequency: Yup.mixed<SavingFrequency>()
            .oneOf(Object.values(SavingFrequency))
            .required(),
        savingMethod: Yup.mixed<SavingMethod>()
            .oneOf(Object.values(SavingMethod))
            .required(),
    });
