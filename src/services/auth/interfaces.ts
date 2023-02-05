export interface LoginOptions {
    email: string;
    password: string;
}

export interface RegistrationOptions extends LoginOptions {
    firstName: string;
    lastName: string;
}
