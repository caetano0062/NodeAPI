//Importar a biblioteca Express
import express, {Request, Response} from "express";

//Importar o arquivo com as credenciais do banco de dados
import { AppDataSource } from "../data-source";

// Criar a Aplicação Express
const router = express.Router();

//Inicialar a conexão com BD

AppDataSource.initialize().then(() => {
    console.log("Conexão do banco de dados realizado com sucesso!")
}).catch((error) => {
    console.log("Erro na conexão com o banco de dados", error)
})

//Criar a rota GET principal
router.get("/", (req:Request, res:Response) => {
    res.send("Bem-Vindo Pessoal! tela de login da rota")
})

export default router