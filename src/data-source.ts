import "reflect-metadata";
import { DataSource } from "typeorm";
import { Situation } from "./entity/Situations";
import { User } from "./entity/Users";

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
    entities: [Situation, User],
    subscribers: [],
   // migrations: [__dirname + "/migration/*.ts"],
    migrations: [__dirname + "/migration/*.{ts,js}"],
    
})

AppDataSource.initialize().then(() => {
    console.log("Conexão do banco de dados realizado com sucesso!")
}).catch((error) => {
    console.log("Erro na conexão com o banco de dados", error)
})