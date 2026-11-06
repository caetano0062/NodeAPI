"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
const yup = __importStar(require("yup"));
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
        const schema = yup.object().shape({
            nameSituation: yup.string()
                .required("O campo nome é obrigatório")
                .min(3, "O campo nome deve ter no mínimo 3 caracteres!")
        });
        yield schema.validate(data, { abortEarly: false });
        const situationRepository = data_source_1.AppDataSource.getRepository(Situations_1.Situation);
        const newSituation = situationRepository.create(data);
        yield situationRepository.save(newSituation);
        return res.status(201).json({
            message: "Situação cadastrada com sucesso!",
            situation: newSituation,
        });
    }
    catch (error) {
        if (error instanceof yup.ValidationError) {
            res.status(400).json({
                messagem: error.errors
            });
        }
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
        const schema = yup.object().shape({
            nameSituation: yup.string()
                .required("O campo nome é obrigatório")
                .min(3, "O campo nome deve ter no mínimo 3 caracteres!")
        });
        yield schema.validate(data, { abortEarly: false });
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
        if (error instanceof yup.ValidationError) {
            res.status(400).json({
                messagem: error.errors
            });
            return;
        }
        res.status(500).json({
            mensagem: "Erro ao atualziar situação!",
        });
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
