//Importar Biblioteca Express
import express, {Request, Response} from "express";
//Criar aplicação express
const router = express.Router();
//Criar rota Get principal 
router.get("/test-connection", (req: Request, res: Response)=>{

    res.status(200).json({message: "Conexâo com a API realizada com sucesso!"});
});
//Exportar instruçoes da rota 
export default router 