import { Request, Response, Router } from "express";
import { AppDataSource } from "../data-source";
import { Situation } from "../entity/Situations";

const router = Router();

//Criar a rota POST
router.post("/situations", async(req: Request, res: Response) => {

    try{
        var data = req.body;

        const situationRepository = AppDataSource.getRepository(Situation);

        const newSituation = situationRepository.create(data);

        await situationRepository.save(newSituation);

        res.status(201).json({
            message: "Situação cadastrada com sucesso!",
            situation: newSituation,
        });

    } catch(error) {
    console.log(error); // ADICIONA ISTO PARA VERMOS O ERRO REAL

    res.status(500).json({
        message: "Erro ao cadastrar situação!",
    });
}

    

});

//Exportar a instrução da rota
export default router;