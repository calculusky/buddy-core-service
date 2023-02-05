import { User } from "@/models/sql/User";
import { comparePassword, generateJWT, hashPassword } from "@/utils";
import { DuplicateUser, InvalidCredentials } from "./errors";
import { LoginOptions, RegistrationOptions } from "./interfaces";

export * from "./interfaces";
export * as Schema from "./schema";

export const register = async (
    options: RegistrationOptions
): Promise<string> => {
    const existingUser = await User.findOne({
        where: { email: options.email },
    });
    if (existingUser) {
        throw new DuplicateUser("An account already exists with this email");
    }
    const password = await hashPassword(options.password);
    const user = await User.create({
        firstName: options.firstName,
        lastName: options.lastName,
        email: options.email,
        password,
    });
    const token = generateJWT(user.id);
    return token;
};

export const login = async (options: LoginOptions): Promise<string> => {
    const user = await User.findOne({
        where: { email: options.email },
    });

    if (!user) {
        throw new InvalidCredentials("Invalid Email or Password");
    }

    const isValidPassword = await comparePassword(
        options.password,
        user.password
    );

    if (!isValidPassword) {
        throw new InvalidCredentials("Invalid Email or Password");
    }

    const token = generateJWT(user.id);

    return token;
};
