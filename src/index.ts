import express from "express";
import dotenv from "dotenv";

dotenv.config();

const app = express();
//incluir os Controllers

//Middleware
app.use(express.json());

import AuthController from"./controllers/AuthController";
import SituationsController from "./controllers/SituationsController";

//Criar as rotas
app.use('/', AuthController)
app.use('/', SituationsController)


app.listen(8080, ()=>{
    console.log("Servidor iniciado na porta 8080: http://localhost:8080")
});
