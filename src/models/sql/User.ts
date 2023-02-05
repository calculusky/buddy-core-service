import {
    Table,
    Column,
    Model,
    HasMany,
    BelongsToMany,
} from "sequelize-typescript";
import { Invite } from "./Invite";
import { Plan } from "./Plan";
import { UserPlan } from "./UserPlan";

interface UserAttributes {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
}

@Table
export class User extends Model<UserAttributes> {
    @Column
    firstName: string;

    @Column
    lastName: boolean;

    @Column({ unique: true })
    email: string;

    @Column
    password: string;

    @HasMany(() => Plan, "userId")
    createdPlans: Plan[];

    @HasMany(() => Invite, "userId")
    receivedInvitations: Invite[];

    @HasMany(() => Invite, "inviterId")
    invitedBuddies: Invite[];

    @BelongsToMany(() => Plan, () => UserPlan)
    plans: Array<Plan & { UserPlan: UserPlan }>;
}
