//Importar Biblioteca Express
import express, {Request, Response} from "express";
import { Situation } from "../entity/Situations";
import { AppDataSource } from "../data-source";
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
        const limit = 2;


        //Contar o total de registros no banco de dados
        const totalSituations = await situationRepository.count();

        //Verificar se  existem registros 
        if(totalSituations === 0){
            res.status(400).json({
                message: "Nenhuma situação encontrada"
            });
            return;
        }
        
        //Calcular a última pagina 
        const lastPage = Math.ceil(totalSituations / limit);

        //Verificar se a página solicitada é válida 
        if(page > lastPage){
            res.status(400).json({
                message: `A página solicitada é inválida. O total de páginas é ${lastPage}.`
            });
            return;
        }

        //Calcular o offset (a partir de qual registro começar a busca)
        const offset = (page - 1) * limit;

        //Recuperar as situações do banco de dados com paginação 

        const situations = await situationRepository.find({
            take: limit,
            skip: offset,
            order: {id: "DESC"}
        });

        //Retornar a resposta com os dados e informações de paginação

        res.status(200).json({
            currentPage: page,
            lastPage,
            totalSituations,
            situations,
        });
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