import "reflect-metadata";
import { DataSource } from "typeorm";

// Importar variáveis de ambiente
import dotenv from "dotenv";

// Carregar
dotenv.config()


export const AppDataSource = new DataSource({
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
    migrations: [__dirname + "/migration/*.ts"],
    
})