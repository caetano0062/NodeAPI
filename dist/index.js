"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
//Importar a biblioteca Express
const express_1 = __importDefault(require("express"));
// Importar variáveis de ambiente
const dotenv_1 = __importDefault(require("dotenv"));
// Carregar
dotenv_1.default.config();
// Criar a Aplicação Express
const app = (0, express_1.default)();
//Incluir as Controllers
const login_1 = __importDefault(require("./controllers/login"));
//Criar as rotas
app.use('/', login_1.default);
//Iniciar o servidor na porta 8080
app.listen(8080, () => {
    console.log("Servidor Iniciado na porta 8080: http://localhost:8080");
});
