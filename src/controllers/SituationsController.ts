//Importar Biblioteca Express
import express, {Request, Response} from "express";
import { Situation } from "../entity/Situations";
import { AppDataSource } from "../data-source";
import { PaginationService } from "../services/PaginationServices";
import * as yup from 'yup';
import { Not } from "typeorm";

//Criar aplicação express
const router = express.Router();


//Criar a Lista 
router.get("/situations", async(req: Request, res: Response)=>{
    try {
        //Obter o repositório da entidade Situation
        const situationRepository = AppDataSource.getRepository(Situation);

        //Receber o numero da pagina e definir pagina 1 como padrão
        const page = Number(req.query.page) || 1;
        
        //Definir o limite de registros por página 
        const limit = Number(req.query.limit) || 10;

        const result = await PaginationService.paginate(
            situationRepository, page, limit, {id: "DESC"});

        //Retornar a resposta com os dados e informações de paginação

        res.status(200).json(result);
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
        

        const schema = yup.object().shape({
            nameSituation: yup.string()
                .required("O nome da situação é obrigatório")
                .min(3, "O nome da situação deve ter no mínimo 3 caracteres")
        });

        await schema.validate(data, { abortEarly: false });

        const situationRepository = AppDataSource.getRepository(Situation);

        const existingSituation = await situationRepository.findOne({
            where : { nameSituation: data.nameSituation }
        });

        if(existingSituation){
            res.status(400).json({
                message: "Já existe uma situação com esse nome"
            });
            return;
        }


        
        const newSituation = situationRepository.create(data);

        await situationRepository.save(newSituation);

        res.status(201).json({
            message: "Situação cadastrada com sucesso",
            situation: newSituation,
        });

    } catch (error) {

        if (error instanceof yup.ValidationError) {
         res.status(400).json({ 
            message: error.errors 
        });
        return;
    }
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

         const schema = yup.object().shape({
            nameSituation: yup.string()
                .required("O nome da situação é obrigatório")
                .min(3, "O nome da situação deve ter no mínimo 3 caracteres")
        });

        await schema.validate(data, { abortEarly: false });

        
        const situationRepository = AppDataSource.getRepository(Situation);

        const situation = await situationRepository.findOneBy({id: parseInt(id)});

        if(!situation){
            res.status(404).json({
                message: "Situação não encontrada"});
            return;
        }

        const existingSituation = await situationRepository.findOne({
            where : { 
                nameSituation: data.nameSituation,
                id: Not(parseInt(id)), // Exclude the current situation from the check}
            }
        });

        if(existingSituation){
            res.status(400).json({
                message: "Já existe uma situação com esse nome"
            });
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

          if (error instanceof yup.ValidationError) {
         res.status(400).json({ 
            message: error.errors 
        });
        return;
    }
        res.status(500).json({ 
            message: "Erro ao atualizar situação" 
        });
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
            message: "Erro ao remover situação" 
        });
        return;
    }
});
//Exportar instruçoes da rota 
export default router 