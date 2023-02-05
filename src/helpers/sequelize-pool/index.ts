import { Sequelize, SequelizeOptions } from "sequelize-typescript";
import { Dialect } from "sequelize";

import { sqlConfig } from "@/config";
import { User } from "@/models/sql/User";

const connectionPoolOptions: SequelizeOptions = {
    host: sqlConfig.host,
    port: sqlConfig.port,
    dialect: (sqlConfig.connection as Dialect) ?? "mysql",
    pool: {
        max: 5,
        min: 0,
        acquire: 60000,
        idle: 20000,
    },
    logging: false,
    models: [User],
};

const connectionPool = new Sequelize(
    sqlConfig.database,
    sqlConfig.user,
    sqlConfig.pass,
    connectionPoolOptions
);

export default connectionPool;
