//Importar Biblioteca Express
import express, {Request, Response} from "express";
//Criar aplicação express
const router = express.Router();
//Criar rota Get principal 
router.get("/", (req: Request, res: Response)=>{
    res.send("Olá, mundo! tela de login da rota");
});
//Exportar instruçoes da rota 
export default router 