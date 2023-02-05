import { Sequelize, SequelizeOptions } from "sequelize-typescript";
import { Dialect } from "sequelize";

import { sqlConfig } from "@/config";
import { User } from "@/models/sql/User";
import { Plan } from "@/models/sql/Plan";
import { Invite } from "@/models/sql/Invite";
import { UserPlan } from "@/models/sql/UserPlan";

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
    models: [User, Plan, Invite, UserPlan],
};

const connectionPool = new Sequelize(
    sqlConfig.database,
    sqlConfig.user,
    sqlConfig.pass,
    connectionPoolOptions
);

export default connectionPool;
