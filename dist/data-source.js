"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppDataSource = void 0;
require("reflect-metadata");
const typeorm_1 = require("typeorm");
exports.AppDataSource = new typeorm_1.DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "Felipe@14032006",
    database: "nodeapi",
    synchronize: false,
    logging: true,
    entities: [],
    subscribers: [],
    migrations: [],
});
