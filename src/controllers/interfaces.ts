import { Request, Response, NextFunction } from "express";
import { Express } from "express-serve-static-core";

export interface TypedRequestBody<T = void> extends Express.Request {
    body: T;
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

export type TypedRequest<
    T = undefined,
    O extends string | number | symbol | undefined | void = undefined
> = T extends undefined
    ? Request
    : TypedRequestBody<
          O extends undefined ? T : Omit<T, Exclude<O, undefined | void>>
      >;
