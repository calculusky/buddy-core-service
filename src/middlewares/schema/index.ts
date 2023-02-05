import { Request, Response, NextFunction } from "express";
import * as Yup from "yup";

const handleError = (res: Response, err: any) => {
    res.status(422).json({
        success: false,
        message: "Failed validation",
        error: err.errors,
    });
};

export const body = (schema: Yup.AnySchema) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            await schema.validate(req.body, { abortEarly: false });
            req.body = schema.cast(req.body);
            next();
        } catch (err: any) {
            handleError(res, err);
        }
    };
};

export const header = (schema: Yup.AnySchema) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            await schema.validate(req.header, { abortEarly: false });
            next();
        } catch (err: any) {
            handleError(res, err);
        }
    };
};

export const params = (schema: Yup.AnySchema) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            await schema.validate(req.params, { abortEarly: false });
            next();
        } catch (err: any) {
            handleError(res, err);
        }
    };
};

export const query = (schema: Yup.AnySchema) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            await schema.validate(req.query, { abortEarly: false });
            next();
        } catch (err: any) {
            handleError(res, err);
        }
    };
};
