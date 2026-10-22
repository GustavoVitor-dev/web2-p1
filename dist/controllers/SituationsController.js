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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
//Importar Biblioteca Express
const express_1 = __importDefault(require("express"));
const Situations_1 = require("../entity/Situations");
const data_source_1 = require("../data-source");
//Criar aplicação express
const router = express_1.default.Router();
//Criar a Lista 
router.get("/situations", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const situationRepository = data_source_1.AppDataSource.getRepository(Situations_1.Situation);
        const situations = yield situationRepository.find();
        res.status(200).json(situations);
        return;
    }
    catch (error) {
        res.status(500).json({
            message: "Erro ao listar situações"
        });
        return;
    }
}));
//Criar a visualização do item cadastrado em situação
router.get("/situations/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const situationRepository = data_source_1.AppDataSource.getRepository(Situations_1.Situation);
        const situation = yield situationRepository.findOneBy({ id: parseInt(id) });
        if (!situation) {
            res.status(404).json({
                message: "Situação não encontrada"
            });
            return;
        }
        res.status(200).json(situation);
        return;
    }
    catch (error) {
        res.status(500).json({
            message: "Erro ao visualizar situação"
        });
        return;
    }
}));
//Criar rota POST 
router.post("/situations", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        var data = req.body;
        console.log(req.body);
        const situationRepository = data_source_1.AppDataSource.getRepository(Situations_1.Situation);
        const newSituation = situationRepository.create(data);
        yield situationRepository.save(newSituation);
        res.status(201).json({
            message: "Situação cadastrada com sucesso",
            situation: newSituation,
        });
    }
    catch (error) {
        res.status(500).json({
            message: "Erro ao cadastrar situação"
        });
    }
}));
//Criar rota PUT
router.put("/situations/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        var data = req.body;
        const situationRepository = data_source_1.AppDataSource.getRepository(Situations_1.Situation);
        const situation = yield situationRepository.findOneBy({ id: parseInt(id) });
        if (!situation) {
            res.status(404).json({
                message: "Situação não encontrada"
            });
            return;
        }
        //Atualiza os dados 
        situationRepository.merge(situation, data);
        //Salvar as alterações de dados
        const updatedSituation = yield situationRepository.save(situation);
        res.status(200).json({
            message: "Situação atualizada com sucesso",
            situation: updatedSituation
        });
        return;
    }
    catch (error) {
        res.status(500).json({
            message: "Erro ao atualizar situação"
        });
        return;
    }
}));
//Criar rota DELETE
router.delete("/situations/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const situationRepository = data_source_1.AppDataSource.getRepository(Situations_1.Situation);
        const situation = yield situationRepository.findOneBy({ id: parseInt(id) });
        if (!situation) {
            res.status(404).json({
                message: "Situação não encontrada"
            });
            return;
        }
        //Remover os dados no banco de dados
        yield situationRepository.remove(situation);
        res.status(200).json({
            message: "Situação removida com sucesso"
        });
        return;
    }
    catch (error) {
        res.status(500).json({
            message: "Erro ao atualizar situação"
        });
        return;
    }
}));
//Exportar instruçoes da rota 
exports.default = router;
