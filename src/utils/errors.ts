export class TokenGenerationError extends Error {
    status: number = 500;
    name: string = "TokenGenerationError";
}

export class TokenValidationError extends Error {
    status: number = 401;
    name: string = "TokenValidationError";
}
