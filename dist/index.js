"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
//Importar Variaveis de Ambiente
const dotenv_1 = __importDefault(require("dotenv"));
//Carregando as Variaveis 
dotenv_1.default.config();
const app = (0, express_1.default)();
//incluir os Controllers
const login_1 = __importDefault(require("./controllers/login"));
//Criar as rotas
app.use('/', login_1.default);
app.listen(process.env.PORT, () => {
    console.log(`Servidor iniciado na porta ${process.env.PORT}: http://localhost:${process.env.PORT}`);
});
