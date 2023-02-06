import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { EMAIL_USER, SESSION_DURATION, SESSION_TOKEN } from "@/config";
import { EmailOptions, JwtPayload } from "./interfaces";
import { User } from "@/models/sql/User";
import { TokenGenerationError, TokenValidationError } from "./errors";
import nodemailer from "nodemailer";
import { EMAIL_PASSWORD } from "@/config";

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
        throw new TokenValidationError("unauthorized! invalid token");
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

export const sendEmail = (options: EmailOptions) => {
    const mailTransporter = nodemailer.createTransport({
        service: "gmail",
        host: "smtp.gmail.com",
        auth: {
            user: EMAIL_USER,
            pass: EMAIL_PASSWORD,
        },
    });

    const mailDetails = {
        from: EMAIL_USER,
        to: options.to,
        subject: options.subject,
        text: options.text,
    };

    mailTransporter.sendMail(mailDetails, (err) => {
        if (err) {
            console.log("Error Occurs", err);
        } else {
            // console.log("Email sent successfully");
        }
    });
};
