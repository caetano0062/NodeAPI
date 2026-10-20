"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const data_source_1 = require("../data-source");
const ProductCategories_1 = require("../entity/ProductCategories");
const PaginationService_1 = require("../services/PaginationService");
const router = (0, express_1.Router)();
router.get("/product-categories", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const productCategoryRepository = data_source_1.AppDataSource.getRepository(ProductCategories_1.ProductCategory);
        const page = Number(req.query.page) || 1;
        const limit = Number(req.query.limit) || 10;
        const result = yield PaginationService_1.PaginationService.paginate(productCategoryRepository, page, limit, { id: "DESC" });
        res.status(200).json(result);
        return;
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Erro ao listar categorias de produto!",
        });
    }
}));
router.get("/product-categories/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const productCategoryRepository = data_source_1.AppDataSource.getRepository(ProductCategories_1.ProductCategory);
        const productCategory = yield productCategoryRepository.findOneBy({
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
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Erro ao buscar categoria de produto!",
        });
    }
}));
router.post("/product-categories", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        var data = req.body;
        const productCategoryRepository = data_source_1.AppDataSource.getRepository(ProductCategories_1.ProductCategory);
        const newProductCategory = productCategoryRepository.create(data);
        yield productCategoryRepository.save(newProductCategory);
        return res.status(201).json({
            message: "Categoria de produto cadastrada com sucesso!",
            productCategory: newProductCategory,
        });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Erro ao cadastrar categoria de produto!",
        });
    }
}));
router.put("/product-categories/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        var data = req.body;
        const productCategoryRepository = data_source_1.AppDataSource.getRepository(ProductCategories_1.ProductCategory);
        const productCategory = yield productCategoryRepository.findOneBy({
            id: Number(id),
        });
        if (!productCategory) {
            return res.status(404).json({
                message: "Categoria de produto não encontrada!",
            });
        }
        productCategoryRepository.merge(productCategory, data);
        const updateProductCategory = yield productCategoryRepository.save(productCategory);
        res.status(200).json({
            mensagem: "Categoria de produto atualizada com sucesso!",
            productCategory: updateProductCategory,
        });
    }
    catch (error) {
        res.status(500).json({
            mensagem: "Erro ao atualizar categoria de produto!",
        });
        return;
    }
}));
router.delete("/product-categories/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const productCategoryRepository = data_source_1.AppDataSource.getRepository(ProductCategories_1.ProductCategory);
        const productCategory = yield productCategoryRepository.findOneBy({
            id: Number(id),
        });
        if (!productCategory) {
            return res.status(404).json({
                message: "Categoria de produto não encontrada!",
            });
        }
        yield productCategoryRepository.remove(productCategory);
        res.status(200).json({
            messagem: "Categoria de produto foi removida com sucesso!",
        });
    }
    catch (error) {
        res.status(500).json({
            mensagem: "Erro ao Deletar categoria de produto!",
        });
        return;
    }
}));
exports.default = router;
