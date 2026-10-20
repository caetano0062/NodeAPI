//Importar a biblioteca Express
import express from "express";
// Importar variaveis de ambiente
import dotenv from "dotenv";

// carregar as variaveis do .env
dotenv.config()

// Criar a Aplicação Express
const app = express();

//Criar um middleware para receber os dados no corpo da requisição
app.use(express.json());

//Incluir as Controllers
import AuthController from "./controllers/AuthController";
import SituationsController from "./controllers/SituationsController";
import ProductCategoriesController from "./controllers/ProductCategoriesController";
import ProductSituationsController from "./controllers/ProductSituationsController";
import ProductsController from "./controllers/ProductsController";

//Criar as rotas
app.use('/', AuthController)
app.use('/', SituationsController)
app.use('/', ProductCategoriesController)
app.use('/', ProductSituationsController)
app.use('/', ProductsController)

//Iniciar o servidor na porta 8080
app.listen(process.env.PORT, ()=>{
    console.log(`Servidor Iniciado na porta ${process.env.PORT}: http://localhost:${process.env.PORT}`)
});