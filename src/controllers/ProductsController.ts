import { Request, Response, Router } from "express";
import { AppDataSource } from "../data-source";
import { Product } from "../entity/Products";
import { PaginationService } from "../services/PaginationService";

const router = Router();

router.get("/products", async (req: Request, res: Response) => {
  try {
    const productRepository = AppDataSource.getRepository(Product);

    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;

    const result = await PaginationService.paginate(productRepository, page, limit, { id: "DESC" });

    res.status(200).json(result);
    return;
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Erro ao listar produtos!",
    });
  }
});

router.get("/products/:id", async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const productRepository = AppDataSource.getRepository(Product);

    const product = await productRepository.findOneBy({
      id: Number(id),
    });

    if (!product) {
      return res.status(404).json({
        message: "Produto não encontrado!",
      });
    }

    return res.status(200).json({
      message: "Produto encontrado com sucesso!",
      product: product,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Erro ao buscar produto!",
    });
  }
});

router.post("/products", async (req: Request, res: Response) => {
  try {
    var data = req.body;

    const productRepository = AppDataSource.getRepository(Product);

    const newProduct = productRepository.create({
      name: data.name,
      productSituation: { id: data.productSituationId },
      productCategory: { id: data.productCategoryId },
    });

    await productRepository.save(newProduct);

    return res.status(201).json({
      message: "Produto cadastrado com sucesso!",
      product: newProduct,
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      message: "Erro ao cadastrar produto!",
    });
  }
});

router.put("/products/:id", async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    var data = req.body;

    const productRepository = AppDataSource.getRepository(Product);

    const product = await productRepository.findOneBy({
      id: Number(id),
    });

    if (!product) {
      return res.status(404).json({
        message: "Produto não encontrado!",
      });
    }

    productRepository.merge(product, {
      name: data.name,
      productSituation: data.productSituationId ? { id: data.productSituationId } : undefined,
      productCategory: data.productCategoryId ? { id: data.productCategoryId } : undefined,
    });

    const updateProduct = await productRepository.save(product);

    res.status(200).json({
      mensagem: "Produto atualizado com sucesso!",
      product: updateProduct,
    });
  } catch (error) {
    res.status(500).json({
      mensagem: "Erro ao atualizar produto!",
    });
    return;
  }
});

router.delete("/products/:id", async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const productRepository = AppDataSource.getRepository(Product);

    const product = await productRepository.findOneBy({
      id: Number(id),
    });

    if (!product) {
      return res.status(404).json({
        message: "Produto não encontrado!",
      });
    }

    await productRepository.remove(product);

    res.status(200).json({
      messagem: "Produto foi removido com sucesso!",
    });
  } catch (error) {
    res.status(500).json({
      mensagem: "Erro ao Deletar produto!",
    });
    return;
  }
});

export default router;