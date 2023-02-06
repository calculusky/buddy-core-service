import {
    BuddyRelationship,
    SavingFrequency,
    SavingMethod,
} from "@/models/sql/Plan";

export interface CreatePlanOptions {
    title: string;
    numberOfBuddies: number;
    buddyRelationship: BuddyRelationship;
    savingMethod: SavingMethod;
    savingFrequency: SavingFrequency;
    hasTarget: boolean;
    startDate: Date;
    endDate: Date;
    annualTargetAmount: number;
}
