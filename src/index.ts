import express from "express";

const app = express();
//incluir os Controllers

import login from"./controllers/login"

//Criar as rotas
app.use('/', login)


app.listen(8080, ()=>{
    console.log("Servidor iniciado na porta 8080: http://localhost:8080")
});
