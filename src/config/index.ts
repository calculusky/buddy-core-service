import dotenv from "dotenv";

import validate, {
    RequiredEnvironment,
    RequiredEnvironmentTypes,
} from "@boxpositron/vre";
export * from "./constants";

dotenv.config();

const runtimeEnvironment: RequiredEnvironment[] = [
    {
        name: "PORT",
        type: RequiredEnvironmentTypes.Number,
    },
    {
        name: "DB_HOST",
        type: RequiredEnvironmentTypes.String,
    },
    {
        name: "DB_PORT",
        type: RequiredEnvironmentTypes.Number,
    },
    {
        name: "DB_USERNAME",
        type: RequiredEnvironmentTypes.String,
    },
    {
        name: "DB_PASSWORD",
        type: RequiredEnvironmentTypes.String,
    },
    {
        name: "DB_DATABASE",
        type: RequiredEnvironmentTypes.String,
    },
    {
        name: "DB_CONNECTION",
        type: RequiredEnvironmentTypes.String,
    },
    {
        name: "ALLOWED_DOMAINS",
        type: RequiredEnvironmentTypes.StringArray,
        delimiter: ",",
    },
    {
        name: "SESSION_TOKEN",
        type: RequiredEnvironmentTypes.String,
    },
    {
        name: "EMAIL_PASSWORD",
        type: RequiredEnvironmentTypes.String,
    },
    {
        name: "EMAIL_USER",
        type: RequiredEnvironmentTypes.String,
    },
];

validate(runtimeEnvironment);

export const isProduction: boolean = process.env.NODE_ENV === "production";
export const port: number = parseInt(process.env.PORT ?? "3000");
export const SESSION_TOKEN = process.env.SESSION_TOKEN;
export const EMAIL_PASSWORD = process.env.EMAIL_PASSWORD;
export const EMAIL_USER = process.env.EMAIL_USER;

export const allowedDomains: string[] =
    process.env.ALLOWED_DOMAINS?.split(",") ?? [];

interface SQLConfig {
    host: string;
    port: number;
    user: string;
    pass: string;
    database: string;
    connection: string;
}

export const sqlConfig: SQLConfig = {
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT),
    user: process.env.DB_USERNAME,
    pass: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    connection: process.env.DB_CONNECTION!,
};
