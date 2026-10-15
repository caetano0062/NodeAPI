import { Request, Response, Router } from "express";
import { AppDataSource } from "../data-source";
import { Situation } from "../entity/Situations";

const router = Router();

// Criar a rota GET principal
router.get("/situations", async (req: Request, res: Response) => {
  try {
    const situationRepository = AppDataSource.getRepository(Situation);

    const situations = await situationRepository.find();

    return res.status(200).json({
      message: "Situações listadas com sucesso!",
      situations: situations,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Erro ao listar situações!",
    });
  }
});

// Criar a rota GET para buscar um item específico por ID
router.get("/situations/:id", async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const situationRepository = AppDataSource.getRepository(Situation);

    const situation = await situationRepository.findOneBy({
      id: Number(id),
    });

    if (!situation) {
      return res.status(404).json({
        message: "Situação não encontrada!",
      });
    }

    return res.status(200).json({
      message: "Situação encontrada com sucesso!",
      situation: situation,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Erro ao buscar situação!",
    });
  }
});

// Criar a rota POST
router.post("/situations", async (req: Request, res: Response) => {
  try {
    var data = req.body;

    const situationRepository = AppDataSource.getRepository(Situation);

    const newSituation = situationRepository.create(data);

    await situationRepository.save(newSituation);

    return res.status(201).json({
      message: "Situação cadastrada com sucesso!",
      situation: newSituation,
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      message: "Erro ao cadastrar situação!",
    });
  }
});


// Criar a rota GET para buscar um item específico por ID
router.put ("/situations/:id", async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    var data = req.body;

    const situationRepository = AppDataSource.getRepository(Situation);

    const situation = await situationRepository.findOneBy({
      id: Number(id),
    });

    if (!situation) {
      return res.status(404).json({
        message: "Situação não encontrada!",
      });
    }

  //Atuliza os dados
situationRepository.merge(situation, data);

//Salvar as alterações de dados
const updateSituation = await situationRepository.save(situation)

res.status(200).json({
    mensagem : "Situação atualizada com sucesso!",
    situation: updateSituation,
});

}catch(error){
    res.status(500).json({
        mensagem : "Erro ao atualziar situação!",
    });
    return
}

});




// Criar a rota GET para buscar um item específico por ID
router.delete ("/situations/:id", async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const situationRepository = AppDataSource.getRepository(Situation);

    const situation = await situationRepository.findOneBy({
      id: Number(id),
    });

    if (!situation) {
      return res.status(404).json({
        message: "Situação não encontrada!",
      });
    }

//remover os dados no banco de dados
await situationRepository.remove(situation);

res.status(200).json({
    messagem : "Situação foi removida com sucesso!",
});

}catch(error){
    res.status(500).json({
        mensagem : "Erro ao Deletar situação!",
    });
    return
}

});


// Exportar a instrução da rota
export default router;