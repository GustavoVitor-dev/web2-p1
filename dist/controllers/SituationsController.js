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
//Criar rota GET principal 
router.get("/situations", (req, res) => {
    res.send("Olá, mundo! tela de situações da rota");
});
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
//Exportar instruçoes da rota 
exports.default = router;
