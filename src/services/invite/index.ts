import { Invite } from "@/models/sql/Invite";
import { Plan } from "@/models/sql/Plan";
import { User } from "@/models/sql/User";
import { sendEmail } from "@/utils";
import { Op } from "sequelize";
import { PlanNotFound } from "../plan/errors";
import {
    InvitationBadRequest,
    InvitationNotFound,
    InvitationUsersNotFound,
} from "./errors";
import { CreateInvitationOptions, UpdateInvitationOptions } from "./interfaces";

export * from "./interfaces";
export * as Schema from "./schema";

export const createInvite = async (
    options: CreateInvitationOptions,
    user: User
) => {
    const plan = await Plan.findByPk(options.planId);
    if (!plan) {
        throw new PlanNotFound("Plan could not be found");
    }

    const toBeInvited = options.inviteeEmails.map(async (email: string) => {
        const invitee = await User.findOne({
            where: {
                email: email,
                id: {
                    [Op.ne]: user.id,
                },
            },
        });
        return invitee;
    });

    const toBeInvitedUsers = (await Promise.all(toBeInvited)).filter(
        (p) => !!p == true
    );

    if (!toBeInvitedUsers.length) {
        throw new InvitationUsersNotFound("No account found with emails");
    }

    for (let toBeInvited of toBeInvitedUsers) {
        sendEmail({
            subject: "Buddy Savings Plan Invitation",
            to: toBeInvited.email,
            text: `Hi, ${toBeInvited.firstName}, you have been invited by one of your buddies for a buddy saving plan. Kindly use this planId ${plan.identifier} to accept or decline the invitation `,
        });
        await Invite.create({
            userId: toBeInvited.id,
            inviterId: user.id,
            planId: options.planId,
        });
    }
};

export const getInvitation = async (planIdentifier: string, user: User) => {
    const plan = await Plan.findOne({
        where: { identifier: planIdentifier },
    });
    if (!plan) {
        throw new PlanNotFound("Plan could not be found");
    }
    const invitation = await Invite.findOne({
        where: {
            planId: plan.id,
            userId: user.id,
        },
        include: [
            {
                model: User,
                as: "inviter",
                attributes: ["firstName", "lastName", "email"],
            },
            {
                model: Plan,
                as: "plan",
            },
        ],
    });
    if (!invitation) {
        throw new InvitationNotFound("Invitation request could not be found");
    }
    return invitation;
};

export const updateInvite = async (
    options: UpdateInvitationOptions,
    user: User
) => {
    const plan = await Plan.findByPk(options.planId);
    if (!plan) {
        throw new PlanNotFound("Plan could not be found");
    }
    const invite = await Invite.findOne({
        where: {
            userId: user.id,
            planId: plan.id,
        },
    });
    if (!invite) {
        throw new InvitationNotFound("Invitation could not be found");
    }

    if (invite.status == "accepted") {
        throw new InvitationBadRequest("Invitation already accepted");
    }

    if (invite.status == "declined") {
        throw new InvitationBadRequest("Invitation already declined");
    }

    if (options.status == "accepted") {
        await Promise.all([
            plan.update({ acceptedBuddies: plan.acceptedBuddies + 1 }),
            invite.update({ status: "accepted" }),
        ]);
    }
};
