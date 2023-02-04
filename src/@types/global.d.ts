export {};

declare global {
    interface RouteError extends Error {
        status: number;
    }
}
