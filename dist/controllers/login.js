"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
//Importar Biblioteca Express
const express_1 = __importDefault(require("express"));
//Criar aplicação express
const router = express_1.default.Router();
//Criar rota Get principal 
router.get("/", (req, res) => {
    res.send("Olá, mundo! tela de login da rota");
});
//Exportar instruçoes da rota 
exports.default = router;
