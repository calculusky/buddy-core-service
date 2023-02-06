import {
    BelongsTo,
    Column,
    DataType,
    Model,
    Table,
} from "sequelize-typescript";
import { Plan } from "./Plan";
import { User } from "./User";

export enum Status {
    pending = "pending",
    accepted = "accepted",
    declined = "declined",
}
interface InviteAttributes {
    id: number;
    userId: number;
    planId: number;
    status: string;
    inviterId: number;
}
@Table
export class Invite extends Model<InviteAttributes> {
    @Column
    userId: number;

    @Column
    planId: number;

    @Column({
        type: DataType.ENUM("pending", "accepted", "declined"),
        defaultValue: "pending",
    })
    status: string;

    @Column
    inviterId: number;

    @BelongsTo(() => User, "userId")
    invitee: User;

    @BelongsTo(() => User, "inviterId")
    inviter: User;

    @BelongsTo(() => Plan, "planId")
    plan: Plan;
}
