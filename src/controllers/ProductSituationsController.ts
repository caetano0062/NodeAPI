import { Request, Response, Router } from "express";
import { AppDataSource } from "../data-source";
import { ProductSituation } from "../entity/ProductSituations";
import { PaginationService } from "../services/PaginationService";

const router = Router();

router.get("/product-situations", async (req: Request, res: Response) => {
  try {
    const productSituationRepository = AppDataSource.getRepository(ProductSituation);

    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;

    const result = await PaginationService.paginate(productSituationRepository, page, limit, { id: "DESC" });

    res.status(200).json(result);
    return;
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Erro ao listar situações de produto!",
    });
  }
});

router.get("/product-situations/:id", async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const productSituationRepository = AppDataSource.getRepository(ProductSituation);

    const productSituation = await productSituationRepository.findOneBy({
      id: Number(id),
    });

    if (!productSituation) {
      return res.status(404).json({
        message: "Situação de produto não encontrada!",
      });
    }

    return res.status(200).json({
      message: "Situação de produto encontrada com sucesso!",
      productSituation: productSituation,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Erro ao buscar situação de produto!",
    });
  }
});

router.post("/product-situations", async (req: Request, res: Response) => {
  try {
    var data = req.body;

    const productSituationRepository = AppDataSource.getRepository(ProductSituation);

    const newProductSituation = productSituationRepository.create(data);

    await productSituationRepository.save(newProductSituation);

    return res.status(201).json({
      message: "Situação de produto cadastrada com sucesso!",
      productSituation: newProductSituation,
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      message: "Erro ao cadastrar situação de produto!",
    });
  }
});

router.put("/product-situations/:id", async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    var data = req.body;

    const productSituationRepository = AppDataSource.getRepository(ProductSituation);

    const productSituation = await productSituationRepository.findOneBy({
      id: Number(id),
    });

    if (!productSituation) {
      return res.status(404).json({
        message: "Situação de produto não encontrada!",
      });
    }

    productSituationRepository.merge(productSituation, data);

    const updateProductSituation = await productSituationRepository.save(productSituation);

    res.status(200).json({
      mensagem: "Situação de produto atualizada com sucesso!",
      productSituation: updateProductSituation,
    });
  } catch (error) {
    res.status(500).json({
      mensagem: "Erro ao atualizar situação de produto!",
    });
    return;
  }
});

router.delete("/product-situations/:id", async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const productSituationRepository = AppDataSource.getRepository(ProductSituation);

    const productSituation = await productSituationRepository.findOneBy({
      id: Number(id),
    });

    if (!productSituation) {
      return res.status(404).json({
        message: "Situação de produto não encontrada!",
      });
    }

    await productSituationRepository.remove(productSituation);

    res.status(200).json({
      messagem: "Situação de produto foi removida com sucesso!",
    });
  } catch (error) {
    res.status(500).json({
      mensagem: "Erro ao Deletar situação de produto!",
    });
    return;
  }
});

export default router;