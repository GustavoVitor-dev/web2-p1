import express, {Request, Response} from "express";

const app = express();

app.listen(8080, ()=>{
    console.log("Servidor iniciado na porta 8080: https://localhost:8080")
});
