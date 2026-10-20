import { Request, Response, Router } from "express";
import { AppDataSource } from "../data-source";
import { ProductCategory } from "../entity/ProductCategories";
import { PaginationService } from "../services/PaginationService";

const router = Router();

router.get("/product-categories", async (req: Request, res: Response) => {
  try {
    const productCategoryRepository = AppDataSource.getRepository(ProductCategory);

    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;

    const result = await PaginationService.paginate(productCategoryRepository, page, limit, { id: "DESC" });

    res.status(200).json(result);
    return;
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Erro ao listar categorias de produto!",
    });
  }
});

router.get("/product-categories/:id", async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const productCategoryRepository = AppDataSource.getRepository(ProductCategory);

    const productCategory = await productCategoryRepository.findOneBy({
      id: Number(id),
    });

    if (!productCategory) {
      return res.status(404).json({
        message: "Categoria de produto não encontrada!",
      });
    }

    return res.status(200).json({
      message: "Categoria de produto encontrada com sucesso!",
      productCategory: productCategory,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Erro ao buscar categoria de produto!",
    });
  }
});

router.post("/product-categories", async (req: Request, res: Response) => {
  try {
    var data = req.body;

    const productCategoryRepository = AppDataSource.getRepository(ProductCategory);

    const newProductCategory = productCategoryRepository.create(data);

    await productCategoryRepository.save(newProductCategory);

    return res.status(201).json({
      message: "Categoria de produto cadastrada com sucesso!",
      productCategory: newProductCategory,
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      message: "Erro ao cadastrar categoria de produto!",
    });
  }
});

router.put("/product-categories/:id", async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    var data = req.body;

    const productCategoryRepository = AppDataSource.getRepository(ProductCategory);

    const productCategory = await productCategoryRepository.findOneBy({
      id: Number(id),
    });

    if (!productCategory) {
      return res.status(404).json({
        message: "Categoria de produto não encontrada!",
      });
    }

    productCategoryRepository.merge(productCategory, data);

    const updateProductCategory = await productCategoryRepository.save(productCategory);

    res.status(200).json({
      mensagem: "Categoria de produto atualizada com sucesso!",
      productCategory: updateProductCategory,
    });
  } catch (error) {
    res.status(500).json({
      mensagem: "Erro ao atualizar categoria de produto!",
    });
    return;
  }
});

router.delete("/product-categories/:id", async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const productCategoryRepository = AppDataSource.getRepository(ProductCategory);

    const productCategory = await productCategoryRepository.findOneBy({
      id: Number(id),
    });

    if (!productCategory) {
      return res.status(404).json({
        message: "Categoria de produto não encontrada!",
      });
    }

    await productCategoryRepository.remove(productCategory);

    res.status(200).json({
      messagem: "Categoria de produto foi removida com sucesso!",
    });
  } catch (error) {
    res.status(500).json({
      mensagem: "Erro ao Deletar categoria de produto!",
    });
    return;
  }
});

export default router;