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
const ProductSituations_1 = require("../entity/ProductSituations");
const PaginationService_1 = require("../services/PaginationService");
const router = (0, express_1.Router)();
router.get("/product-situations", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const productSituationRepository = data_source_1.AppDataSource.getRepository(ProductSituations_1.ProductSituation);
        const page = Number(req.query.page) || 1;
        const limit = Number(req.query.limit) || 10;
        const result = yield PaginationService_1.PaginationService.paginate(productSituationRepository, page, limit, { id: "DESC" });
        res.status(200).json(result);
        return;
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Erro ao listar situações de produto!",
        });
    }
}));
router.get("/product-situations/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const productSituationRepository = data_source_1.AppDataSource.getRepository(ProductSituations_1.ProductSituation);
        const productSituation = yield productSituationRepository.findOneBy({
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
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Erro ao buscar situação de produto!",
        });
    }
}));
router.post("/product-situations", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        var data = req.body;
        const productSituationRepository = data_source_1.AppDataSource.getRepository(ProductSituations_1.ProductSituation);
        const newProductSituation = productSituationRepository.create(data);
        yield productSituationRepository.save(newProductSituation);
        return res.status(201).json({
            message: "Situação de produto cadastrada com sucesso!",
            productSituation: newProductSituation,
        });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Erro ao cadastrar situação de produto!",
        });
    }
}));
router.put("/product-situations/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        var data = req.body;
        const productSituationRepository = data_source_1.AppDataSource.getRepository(ProductSituations_1.ProductSituation);
        const productSituation = yield productSituationRepository.findOneBy({
            id: Number(id),
        });
        if (!productSituation) {
            return res.status(404).json({
                message: "Situação de produto não encontrada!",
            });
        }
        productSituationRepository.merge(productSituation, data);
        const updateProductSituation = yield productSituationRepository.save(productSituation);
        res.status(200).json({
            mensagem: "Situação de produto atualizada com sucesso!",
            productSituation: updateProductSituation,
        });
    }
    catch (error) {
        res.status(500).json({
            mensagem: "Erro ao atualizar situação de produto!",
        });
        return;
    }
}));
router.delete("/product-situations/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const productSituationRepository = data_source_1.AppDataSource.getRepository(ProductSituations_1.ProductSituation);
        const productSituation = yield productSituationRepository.findOneBy({
            id: Number(id),
        });
        if (!productSituation) {
            return res.status(404).json({
                message: "Situação de produto não encontrada!",
            });
        }
        yield productSituationRepository.remove(productSituation);
        res.status(200).json({
            messagem: "Situação de produto foi removida com sucesso!",
        });
    }
    catch (error) {
        res.status(500).json({
            mensagem: "Erro ao Deletar situação de produto!",
        });
        return;
    }
}));
exports.default = router;
