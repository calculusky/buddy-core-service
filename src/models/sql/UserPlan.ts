import { Column, ForeignKey, Model, Table } from "sequelize-typescript";
import { Plan } from "./Plan";
import { User } from "./User";

interface UserPlanAttributes {
    id: number;
    userId: number;
    planId: number;
    targetAmount: number;
}

@Table
export class UserPlan extends Model<UserPlanAttributes> {
    @ForeignKey(() => User)
    @Column
    userId: number;

    @ForeignKey(() => Plan)
    @Column
    planId: number;

    @Column
    targetAmount: number;
}
