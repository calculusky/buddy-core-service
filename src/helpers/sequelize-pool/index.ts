import { Sequelize, Options, Dialect } from "sequelize";
import { sqlConfig } from "@/config";

const connectionPoolOptions: Options = {
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
};

const connectionPool = new Sequelize(
    sqlConfig.database,
    sqlConfig.user,
    sqlConfig.pass,
    connectionPoolOptions
);

export default connectionPool;
