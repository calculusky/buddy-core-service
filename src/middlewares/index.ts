import { NextFunction, Request, Response } from "express";
import { RequestWithUser } from "./interfaces";
import { TokenValidationError, validateJWT } from "@/utils";
import { User } from "@/models/sql/User";

export const authenticate = async (
    _req: RequestWithUser,
    _res: Response,
    next: NextFunction
) => {
    try {
        const authorization = _req.header("Authorization");
        if (!authorization) {
            throw new TokenValidationError("unauthorized! invalid token");
        }

        const token = authorization.split("Bearer ")[1];
        const user = await validateJWT(token);
        _req.user = user as User;
        next();
    } catch (err) {
        next(err);
    }
};
