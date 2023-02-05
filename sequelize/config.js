const path = require("path");
const dotenv = require("dotenv");

const {
    default: validate,
    RequiredEnvironmentTypes,
} = require("@boxpositron/vre");

dotenv.config();

const runtimeEnvironment = [
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
];

validate(runtimeEnvironment);

const sqlConfig = {
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    dialect: process.env.DB_CONNECTION,
    modelPaths: [path.resolve("build", "models", "sql")],
};

module.exports = {
    development: sqlConfig,
    test: sqlConfig,
    production: sqlConfig,
};
