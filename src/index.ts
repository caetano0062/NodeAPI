//Importar a biblioteca Express
import express, {Request, Response} from "express";

//Criar a Aplicação Express
const app = express();

//Criar a rota GET principal
app.get("/",(req:Request, res:Response)=>{
    res.send("Bem-Vindo Pessoal!")
})



//Iniciar o servidor na porta 8080
app.listen(8080, () => {
    console.log("Servidor Iniciado na porta 8080: http://localhost:8080")
});