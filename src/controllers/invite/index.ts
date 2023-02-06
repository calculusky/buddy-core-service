import { ControllerWithUser, ControllerWithUserQuery } from "../interfaces";
import * as InviteService from "@/services/invite";
import { User } from "@/models/sql/User";

export const createInvite: ControllerWithUser<
    InviteService.CreateInvitationOptions,
    User
> = async (req, res, next) => {
    try {
        await InviteService.createInvite(req.body, req.user);

        res.status(201).json({
            success: true,
            message: "Invitation Successfully Sent",
        });
    } catch (err) {
        next(err);
    }
};

export const getInvite: ControllerWithUserQuery<
    InviteService.GetInvitationByPlanOptions,
    User
> = async (req, res, next) => {
    try {
        const invitation = await InviteService.getInvitation(
            req.query.planIdentifier,
            req.user
        );

        res.json({
            success: true,
            message: "Invitation Successfully Retrieved",
            data: {
                invitation,
            },
        });
    } catch (err) {
        next(err);
    }
};

export const updateInvite: ControllerWithUser<
    InviteService.UpdateInvitationOptions,
    User
> = async (req, res, next) => {
    try {
        await InviteService.updateInvite(req.body, req.user);

        res.status(201).json({
            success: true,
            message: "Invitation Successfully Accepted",
        });
    } catch (err) {
        next(err);
    }
};
