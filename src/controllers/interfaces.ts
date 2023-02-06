import { RequestWithUser } from "@/middlewares/interfaces";
import { Request, Response, NextFunction } from "express";
import { Express } from "express-serve-static-core";

export interface TypedRequestBody<T = void> extends Express.Request {
    body: T;
}

export interface TypedRequestBodyWithUser<T = void, U = void>
    extends Express.Request {
    body: T;
    user?: U;
}

export interface TypedRequestQueryWithUser<T = void, U = void>
    extends Express.Request {
    query: T;
    user?: U;
}

export type Controller<
    T = undefined,
    O extends string | number | symbol | undefined | void = undefined
> = (
    req: T extends undefined
        ? Request
        : TypedRequestBody<
              O extends undefined ? T : Omit<T, Exclude<O, undefined | void>>
          >,
    res: Response,
    next: NextFunction
) => void | Promise<void>;

export type ControllerWithUser<
    T = undefined,
    U = undefined,
    O extends string | number | symbol | undefined | void = undefined
> = (
    req: T extends undefined
        ? Request
        : TypedRequestBodyWithUser<
              O extends undefined ? T : Omit<T, Exclude<O, undefined | void>>,
              U
          >,
    res: Response,
    next: NextFunction
) => void | Promise<void>;

export type ControllerWithUserQuery<
    T = undefined,
    U = undefined,
    O extends string | number | symbol | undefined | void = undefined
> = (
    req: T extends undefined
        ? Request
        : TypedRequestQueryWithUser<
              O extends undefined ? T : Omit<T, Exclude<O, undefined | void>>,
              U
          >,
    res: Response,
    next: NextFunction
) => void | Promise<void>;
