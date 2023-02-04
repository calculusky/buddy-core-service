import { Router, Request, Response, NextFunction } from "express";

import { isProduction } from "@/config";

const router = Router();

// Health check
router.get("/health", (_req, res) => res.sendStatus(200));

router.use((_req: Request, _res: Response, next) => {
    const err = new Error("This route does not exists") as RouteError;
    err.status = 404;

    next(err);
});

router.use(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    (err: RouteError, _req: Request, res: Response, _next: NextFunction) => {
        res.status(err.status ?? 500).json({
            success: false,
            message: err.message ?? "Something happened",
            stack: isProduction ? undefined : err.stack, // Only show stack in development
        });
    }
);

export default router;
