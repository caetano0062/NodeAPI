//Importar a biblioteca Express
import express from "express";
// Importar variáveis de ambiente
import dotenv from "dotenv";

// Carregar
dotenv.config()

// Criar a Aplicação Express
const app = express();

//Incluir as Controllers
import login from "./controllers/login";

//Criar as rotas
app.use('/', login)

//Iniciar o servidor na porta 8080
app.listen(8080, () => {
    console.log("Servidor Iniciado na porta 8080: http://localhost:8080")
});