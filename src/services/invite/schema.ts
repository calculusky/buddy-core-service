import { Status } from "@/models/sql/Invite";
import * as Yup from "yup";
import {
    CreateInvitationOptions,
    GetInvitationByPlanOptions,
    UpdateInvitationOptions,
} from "./interfaces";

export const CreateInvitationSchema: Yup.SchemaOf<CreateInvitationOptions> =
    Yup.object().shape({
        planId: Yup.number().required(),
        inviteeEmails: Yup.array().of(Yup.string().email()),
    });

export const GetInvitationByPlanIdentifierSchema: Yup.SchemaOf<GetInvitationByPlanOptions> =
    Yup.object().shape({
        planIdentifier: Yup.string().required(),
    });

export const UpdateInvitationSchema: Yup.SchemaOf<UpdateInvitationOptions> =
    Yup.object().shape({
        planId: Yup.number().required(),
        status: Yup.mixed<Status>().oneOf(Object.values(Status)).required(),
    });
