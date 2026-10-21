//Importar Biblioteca Express
import express, {Request, Response} from "express";
import { Situation } from "../entity/Situations";
import { AppDataSource } from "../data-source";
//Criar aplicação express
const router = express.Router();
//Criar rota GET principal 
router.get("/situations", (req: Request, res: Response)=>{
    res.send("Olá, mundo! tela de situações da rota");
});
//Criar rota POST 
router.post("/situations", async (req: Request, res: Response)=>{

    try {
        var data = req.body;
        console.log(req.body);

        const situationRepository = AppDataSource.getRepository(Situation);
        
        const newSituation = situationRepository.create(data);

        await situationRepository.save(newSituation);

        res.status(201).json({
            message: "Situação cadastrada com sucesso",
            situation: newSituation,
        });

    } catch (error) {
        res.status(500).json({ 
            message: "Erro ao cadastrar situação" 
        });
    }
});
//Exportar instruçoes da rota 
export default router 