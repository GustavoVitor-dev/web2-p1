//Importar Biblioteca Express
import express, {Request, Response} from "express";

//Importar o arquivo com as credenciais do db
import { AppDataSource } from "../data-source";
import { errors } from "undici-types";

//Criar aplicação express
const router = express.Router();

//Inicializar a conexão com o banco de dados
AppDataSource.initialize().then(()=>{
    console.log("conexão do banco de dados realizada com sucesso!")
}).catch((error)=>{
    console.log("Erro na conexão com o banco de dados ")
})

//Criar rota Get principal 
router.get("/", (req: Request, res: Response)=>{
    res.send("Olá, mundo! tela de login da rota");
});

//Exportar instruçoes da rota 
export default router 