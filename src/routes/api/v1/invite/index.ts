import { Router } from "express";

import * as Check from "@/middlewares/schema";

import * as InviteController from "@/controllers/invite";

import * as InviteService from "@/services/invite";

import * as Middleware from "@/middlewares";

const router = Router();

router
    .route("/")
    .get(
        Check.query(InviteService.Schema.GetInvitationByPlanIdentifierSchema),
        Middleware.authenticate,
        InviteController.getInvite
    )
    .post(
        Check.body(InviteService.Schema.CreateInvitationSchema),
        Middleware.authenticate,
        InviteController.createInvite
    )
    .patch(
        Check.body(InviteService.Schema.UpdateInvitationSchema),
        Middleware.authenticate,
        InviteController.updateInvite
    );

export default router;
