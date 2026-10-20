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
const Products_1 = require("../entity/Products");
const PaginationService_1 = require("../services/PaginationService");
const router = (0, express_1.Router)();
router.get("/products", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const productRepository = data_source_1.AppDataSource.getRepository(Products_1.Product);
        const page = Number(req.query.page) || 1;
        const limit = Number(req.query.limit) || 10;
        const result = yield PaginationService_1.PaginationService.paginate(productRepository, page, limit, { id: "DESC" });
        res.status(200).json(result);
        return;
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Erro ao listar produtos!",
        });
    }
}));
router.get("/products/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const productRepository = data_source_1.AppDataSource.getRepository(Products_1.Product);
        const product = yield productRepository.findOneBy({
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
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Erro ao buscar produto!",
        });
    }
}));
router.post("/products", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        var data = req.body;
        const productRepository = data_source_1.AppDataSource.getRepository(Products_1.Product);
        const newProduct = productRepository.create({
            name: data.name,
            productSituation: { id: data.productSituationId },
            productCategory: { id: data.productCategoryId },
        });
        yield productRepository.save(newProduct);
        return res.status(201).json({
            message: "Produto cadastrado com sucesso!",
            product: newProduct,
        });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Erro ao cadastrar produto!",
        });
    }
}));
router.put("/products/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        var data = req.body;
        const productRepository = data_source_1.AppDataSource.getRepository(Products_1.Product);
        const product = yield productRepository.findOneBy({
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
        const updateProduct = yield productRepository.save(product);
        res.status(200).json({
            mensagem: "Produto atualizado com sucesso!",
            product: updateProduct,
        });
    }
    catch (error) {
        res.status(500).json({
            mensagem: "Erro ao atualizar produto!",
        });
        return;
    }
}));
router.delete("/products/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const productRepository = data_source_1.AppDataSource.getRepository(Products_1.Product);
        const product = yield productRepository.findOneBy({
            id: Number(id),
        });
        if (!product) {
            return res.status(404).json({
                message: "Produto não encontrado!",
            });
        }
        yield productRepository.remove(product);
        res.status(200).json({
            messagem: "Produto foi removido com sucesso!",
        });
    }
    catch (error) {
        res.status(500).json({
            mensagem: "Erro ao Deletar produto!",
        });
        return;
    }
}));
exports.default = router;
