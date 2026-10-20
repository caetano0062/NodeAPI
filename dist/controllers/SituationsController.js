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
const Situations_1 = require("../entity/Situations");
const PaginationService_1 = require("../services/PaginationService");
const router = (0, express_1.Router)();
// Criar a rota GET principal (Atualizada com Paginação da aula)
router.get("/situations", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Obter o repositório da entidade Situation
        const situationRepository = data_source_1.AppDataSource.getRepository(Situations_1.Situation);
        // Receber o número da página e definir página 1 como padrão
        const page = Number(req.query.page) || 1;
        // Definir o limite de registros por página
        const limit = Number(req.query.limit) || 10;
        const result = yield PaginationService_1.PaginationService.paginate(situationRepository, page, limit, { id: "DESC" });
        // Retornar a resposta com os dados e informações da paginação
        res.status(200).json(result);
        return;
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Erro ao listar situações!",
        });
    }
}));
// Criar a rota GET para buscar um item específico por ID
router.get("/situations/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const situationRepository = data_source_1.AppDataSource.getRepository(Situations_1.Situation);
        const situation = yield situationRepository.findOneBy({
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
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Erro ao buscar situação!",
        });
    }
}));
// Criar a rota POST
router.post("/situations", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        var data = req.body;
        const situationRepository = data_source_1.AppDataSource.getRepository(Situations_1.Situation);
        const newSituation = situationRepository.create(data);
        yield situationRepository.save(newSituation);
        return res.status(201).json({
            message: "Situação cadastrada com sucesso!",
            situation: newSituation,
        });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Erro ao cadastrar situação!",
        });
    }
}));
// Criar a rota PUT para atualizar um item específico por ID
router.put("/situations/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        var data = req.body;
        const situationRepository = data_source_1.AppDataSource.getRepository(Situations_1.Situation);
        const situation = yield situationRepository.findOneBy({
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
        const updateSituation = yield situationRepository.save(situation);
        res.status(200).json({
            mensagem: "Situação atualizada com sucesso!",
            situation: updateSituation,
        });
    }
    catch (error) {
        res.status(500).json({
            mensagem: "Erro ao atualziar situação!",
        });
        return;
    }
}));
// Criar a rota DELETE para remover um item específico por ID
router.delete("/situations/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const situationRepository = data_source_1.AppDataSource.getRepository(Situations_1.Situation);
        const situation = yield situationRepository.findOneBy({
            id: Number(id),
        });
        if (!situation) {
            return res.status(404).json({
                message: "Situação não encontrada!",
            });
        }
        //remover os dados no banco de dados
        yield situationRepository.remove(situation);
        res.status(200).json({
            messagem: "Situação foi removida com sucesso!",
        });
    }
    catch (error) {
        res.status(500).json({
            mensagem: "Erro ao Deletar situação!",
        });
        return;
    }
}));
// Exportar a instrução da rota
exports.default = router;
