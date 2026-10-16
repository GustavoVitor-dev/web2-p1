import express from "express";
//Importar Variaveis de Ambiente
import dotenv from "dotenv";
//Carregando as Variaveis 
dotenv.config()

const app = express();
//incluir os Controllers

import login from"./controllers/login"

//Criar as rotas
app.use('/', login)


app.listen(process.env.PORT , ()=>{
    console.log(`Servidor iniciado na porta ${process.env.PORT}: http://localhost:${process.env.PORT}`)
});
