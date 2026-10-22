//Importar Biblioteca Express
import express, {Request, Response} from "express";
import { ProductSituation } from "../entity/ProductSituations";
import { AppDataSource } from "../data-source";
import { PaginationService } from "../services/PaginationServices";
//Criar aplicação express
const router = express.Router();


//Criar a Lista 
router.get("/product-situations", async(req: Request, res: Response)=>{
    try {
        //Obter o repositório da entidade ProductSituation
        const productSituationRepository = AppDataSource.getRepository(ProductSituation);

        //Receber o numero da pagina e definir pagina 1 como padrão
        const page = Number(req.query.page) || 1;
        
        //Definir o limite de registros por página 
        const limit = Number(req.query.limit) || 10;

        const result = await PaginationService.paginate(
            productSituationRepository, page, limit, {id: "DESC"});

        //Retornar a resposta com os dados e informações de paginação

        res.status(200).json(result);
        return;
    
    }catch (error) {
        res.status(500).json({ 
            message: "Erro ao listar situações de produtos" 
        });
        return;
    }
});

//Criar a visualização do item cadastrado em situação de produto
router.get("/product-situations/:id", async(req: Request<{ id: string }>, res: Response)=>{
    try {
        
        const { id } = req.params;
        
        const productSituationRepository = AppDataSource.getRepository(ProductSituation);

        const productSituation = await productSituationRepository.findOneBy({id: parseInt(id)});

        if(!productSituation){
            res.status(404).json({
                message: "Situação de produto não encontrada"});
            return;
        }

        res.status(200).json(productSituation);
        return;
    
    }catch (error) {
        res.status(500).json({ 
            message: "Erro ao visualizar situação de produto" 
        });
        return;
    }
});

//Criar rota POST 
router.post("/product-situations", async (req: Request, res: Response)=>{

    try {
        var data = req.body;
        console.log(req.body);

        const productSituationRepository = AppDataSource.getRepository(ProductSituation);
        
        const newProductSituation = productSituationRepository.create(data);

        await productSituationRepository.save(newProductSituation);

        res.status(201).json({
            message: "Situação de produto cadastrada com sucesso",
            productSituation: newProductSituation,
        });

    } catch (error) {
        res.status(500).json({ 
            message: "Erro ao cadastrar situação de produto" 
        });
    }
});

//Criar rota PUT
router.put("/product-situations/:id", async(req: Request<{ id: string }>, res: Response)=>{
    try {
        
        const { id } = req.params;

        var data = req.body;
        
        const productSituationRepository = AppDataSource.getRepository(ProductSituation);

        const productSituation = await productSituationRepository.findOneBy({id: parseInt(id)});

        if(!productSituation){
            res.status(404).json({
                message: "Situação de produto não encontrada"});
            return;
        }
        //Atualiza os dados 
        productSituationRepository.merge(productSituation, data);
        //Salvar as alterações de dados
        const updatedProductSituation = await productSituationRepository.save(productSituation);

        res.status(200).json({
            message: "Situação de produto atualizada com sucesso",
            productSituation: updatedProductSituation
        });
        return;
    
    }catch (error) {
        res.status(500).json({ 
            message: "Erro ao atualizar situação de produto" 
        });
        return;
    }
});

//Criar rota DELETE
router.delete("/product-situations/:id", async(req: Request<{ id: string }>, res: Response)=>{
    try {
        
        const { id } = req.params;
        
        const productSituationRepository = AppDataSource.getRepository(ProductSituation);

        const productSituation = await productSituationRepository.findOneBy({id: parseInt(id)});

        if(!productSituation){
            res.status(404).json({
                message: "Situação de produto não encontrada"});
            return;
        }
        //Remover os dados no banco de dados
        await productSituationRepository.remove(productSituation);

        res.status(200).json({
            message: "Situação de produto removida com sucesso"
        });
        return;
    
    }catch (error) {
        res.status(500).json({ 
            message: "Erro ao remover situação de produto" 
        });
        return;
    }
});
//Exportar instruçoes da rota 
export default router 