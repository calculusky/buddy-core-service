import {
    Table,
    Column,
    Model,
    DataType,
    ForeignKey,
    BelongsTo,
    BelongsToMany,
} from "sequelize-typescript";
import { User } from "./User";
import { UserPlan } from "./UserPlan";

enum SavingFrequency {
    daily = "daily",
    weekly = "weekly",
    monthly = "monthly",
}

enum SavingMethod {
    automatic = "automatic",
    manual = "manual",
}

enum BuddyRelationship {
    sibling = "sibling",
    spouse = "spouse",
    cousin = "cousin",
    friend = "friend",
    parent = "parent",
    child = "child",
}
interface PlanAttributes {
    id: number;
    identifier: string;
    title: string;
    userId: number;
    invitedBuddies: number;
    acceptedBuddies: number;
    savingMethod: SavingMethod;
    savingFrequency: SavingFrequency;
    hasTarget: boolean;
    startDate: Date;
    endDate: Date;
    buddyRelationship: BuddyRelationship;
    annualTargetAmount: number;
}

@Table
export class Plan extends Model<PlanAttributes> {
    @Column
    identifier: string;

    @Column
    title: string;

    @ForeignKey(() => User)
    @Column
    userId: number;

    @Column({ defaultValue: 0 })
    invitedBuddies: number;

    @Column({ defaultValue: 0 })
    acceptedBuddies: number;

    @Column({ type: DataType.ENUM("sibling", "cousin", "spouse", "parent") })
    buddyRelationship: string;

    @Column({ type: DataType.ENUM("automatic", "manual") })
    savingMethod: string;

    @Column({ type: DataType.ENUM("daily", "weekly", "monthly") })
    savingFrequency: string;

    @Column({ defaultValue: 0 })
    hasTarget: boolean;

    @Column
    startDate: Date;

    @Column
    endDate: Date;

    @Column
    annualTargetAmount: number;

    @Column({ defaultValue: 0 })
    isLocked: boolean;

    @BelongsTo(() => User, "userId")
    createdBy: User;

    @BelongsToMany(() => User, () => UserPlan)
    users: Array<User & { UserPlan: UserPlan }>;
}
