export interface CreateInvitationOptions {
    planId: number;
    inviteeEmails: string[];
}

export interface GetInvitationByPlanOptions {
    planIdentifier?: string;
}

export interface UpdateInvitationOptions {
    status: string;
    planId: number;
}
