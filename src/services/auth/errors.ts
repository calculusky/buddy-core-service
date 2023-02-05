export class DuplicateUser extends Error {
    name: string = "DuplicateUser";
    status: number = 426;
}

export class InvalidCredentials extends Error {
    status: number = 401;
    name: string = "InvalidCredentials";
}
