"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
//Importar Biblioteca Express
const express_1 = __importDefault(require("express"));
//Importar o arquivo com as credenciais do db
const data_source_1 = require("../data-source");
//Criar aplicação express
const router = express_1.default.Router();
//Inicializar a conexão com o banco de dados
data_source_1.AppDataSource.initialize().then(() => {
    console.log("conexão do banco de dados realizada com sucesso!");
}).catch((error) => {
    console.log("Erro na conexão com o banco de dados ");
});
//Criar rota Get principal 
router.get("/", (req, res) => {
    res.send("Olá, mundo! tela de login da rota");
});
//Exportar instruçoes da rota 
exports.default = router;
