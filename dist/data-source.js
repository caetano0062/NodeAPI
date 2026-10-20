"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppDataSource = void 0;
require("reflect-metadata");
const typeorm_1 = require("typeorm");
const Situations_1 = require("./entity/Situations");
const Users_1 = require("./entity/Users");
const Products_1 = require("./entity/Products");
const ProductCategories_1 = require("./entity/ProductCategories");
const ProductSituations_1 = require("./entity/ProductSituations");
// Importar variáveis de ambiente
const dotenv_1 = __importDefault(require("dotenv"));
// Carregar
dotenv_1.default.config();
exports.AppDataSource = new typeorm_1.DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "Felipe@14032006",
    database: "nodeapi",
    synchronize: false,
    logging: true,
    entities: [Situations_1.Situation, Users_1.User, Products_1.Product, ProductCategories_1.ProductCategory, ProductSituations_1.ProductSituation],
    subscribers: [],
    // migrations: [__dirname + "/migration/*.ts"],
    migrations: [__dirname + "/migration/*.{ts,js}"],
});
exports.AppDataSource.initialize().then(() => {
    console.log("Conexão do banco de dados realizado com sucesso!");
}).catch((error) => {
    console.log("Erro na conexão com o banco de dados", error);
});
