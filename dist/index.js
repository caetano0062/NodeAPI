"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
//Importar a biblioteca Express
const express_1 = __importDefault(require("express"));
//Criar a Aplicação Express
const app = (0, express_1.default)();
//Criar a rota GET principal
app.get("/", (req, res) => {
    res.send("Bem-Vindo Pessoal!");
});
//Iniciar o servidor na porta 8080
app.listen(8080, () => {
    console.log("Servidor Iniciado na porta 8080: http://localhost:8080");
});
