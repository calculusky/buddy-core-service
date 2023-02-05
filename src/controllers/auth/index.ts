import { Controller } from "../interfaces";
import * as AuthService from "@/services/auth";

export const register: Controller<AuthService.RegistrationOptions> = async (
    req,
    res,
    next
) => {
    try {
        const token = await AuthService.register({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            password: req.body.password,
        });

        res.status(201).json({
            success: true,
            message: "User registered successfully",
            data: {
                token,
            },
        });
    } catch (err) {
        next(err);
    }
};

export const login: Controller<AuthService.LoginOptions> = async (
    req,
    res,
    next
) => {
    try {
        const token = await AuthService.login({
            email: req.body.email,
            password: req.body.password,
        });

        res.json({
            success: true,
            message: "User authenticated successfully",
            data: {
                token,
            },
        });
    } catch (err) {
        next(err);
    }
};
