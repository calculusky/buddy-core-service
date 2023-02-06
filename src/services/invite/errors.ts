export class InvitationUsersNotFound extends Error {
    name = "InvitationUsersNotFound";
    status = 404;
}

export class InvitationNotFound extends Error {
    name = "InvitationNotFound";
    status = 404;
}

export class InvitationBadRequest extends Error {
    name = "InvitationBadRequest";
    status = 400;
}
