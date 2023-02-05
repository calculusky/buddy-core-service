import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { SESSION_DURATION, SESSION_TOKEN } from "@/config";
import { JwtPayload } from "./interfaces";
import { User } from "@/models/sql/User";
import { TokenGenerationError, TokenValidationError } from "./errors";

export * from "./interfaces";
export * from "./errors";

export const hashPassword = (password: string): Promise<string> => {
    return bcrypt.hash(password, 10);
};

export const comparePassword = (
    password: string,
    hash: string
): Promise<boolean> => {
    return bcrypt.compare(password, hash);
};

export const validateJWT = async (token: string): Promise<User> => {
    try {
        const { id } = jwt.verify(token, SESSION_TOKEN) as JwtPayload;

        const user = await User.findByPk(id);

        return user;
    } catch (error) {
        throw new TokenValidationError("invalid token");
    }
};

export const generateJWT = (id: number): string => {
    try {
        if (!id) {
            throw new TokenGenerationError("User id is required");
        }

        const payload: JwtPayload = {
            id: id,
            createdAt: Date.now(),
        };

        const token = jwt.sign(payload, SESSION_TOKEN, {
            algorithm: "HS256",
            expiresIn: SESSION_DURATION,
        });

        return token;
    } catch (error) {
        console.log(error);
        throw new TokenGenerationError("failed to generate token");
    }
};
