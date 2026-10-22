//Importar Biblioteca Express
import express, {Request, Response} from "express";
import { Situation } from "../entity/Situations";
import { AppDataSource } from "../data-source";
//Criar aplicação express
const router = express.Router();
//Criar a Lista 
router.get("/situations", async(req: Request, res: Response)=>{
    try {
        const situationRepository = AppDataSource.getRepository(Situation);

        const situations = await situationRepository.find();

        res.status(200).json(situations);
        return;
    
    }catch (error) {
        res.status(500).json({ 
            message: "Erro ao listar situações" 
        });
        return;
    }
});

//Criar a visualização do item cadastrado em situação
router.get("/situations/:id", async(req: Request<{ id: string }>, res: Response)=>{
    try {
        
        const { id } = req.params;
        
        const situationRepository = AppDataSource.getRepository(Situation);

        const situation = await situationRepository.findOneBy({id: parseInt(id)});

        if(!situation){
            res.status(404).json({
                message: "Situação não encontrada"});
            return;
        }

        res.status(200).json(situation);
        return;
    
    }catch (error) {
        res.status(500).json({ 
            message: "Erro ao listar situações" 
        });
        return;
    }
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