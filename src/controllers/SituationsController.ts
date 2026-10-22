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
            message: "Erro ao visualizar situação" 
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

//Criar rota PUT
router.put("/situations/:id", async(req: Request<{ id: string }>, res: Response)=>{
    try {
        
        const { id } = req.params;

        var data = req.body;
        
        const situationRepository = AppDataSource.getRepository(Situation);

        const situation = await situationRepository.findOneBy({id: parseInt(id)});

        if(!situation){
            res.status(404).json({
                message: "Situação não encontrada"});
            return;
        }
        //Atualiza os dados 
        situationRepository.merge(situation, data);
        //Salvar as alterações de dados
        const updatedSituation = await situationRepository.save(situation);

        res.status(200).json({
            message: "Situação atualizada com sucesso",
            situation: updatedSituation
        });
        return;
    
    }catch (error) {
        res.status(500).json({ 
            message: "Erro ao atualizar situação" 
        });
        return;
    }
});

//Criar rota DELETE
router.delete("/situations/:id", async(req: Request<{ id: string }>, res: Response)=>{
    try {
        
        const { id } = req.params;
        
        const situationRepository = AppDataSource.getRepository(Situation);

        const situation = await situationRepository.findOneBy({id: parseInt(id)});

        if(!situation){
            res.status(404).json({
                message: "Situação não encontrada"});
            return;
        }
        //Remover os dados no banco de dados
        await situationRepository.remove(situation);

        res.status(200).json({
            message: "Situação removida com sucesso"
        });
        return;
    
    }catch (error) {
        res.status(500).json({ 
            message: "Erro ao atualizar situação" 
        });
        return;
    }
});
//Exportar instruçoes da rota 
export default router 