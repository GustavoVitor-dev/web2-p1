//Importar Biblioteca Express
import express, {Request, Response} from "express";
import { ProductCategory } from "../entity/ProductCategories";
import { AppDataSource } from "../data-source";
import { PaginationService } from "../services/PaginationServices";
//Criar aplicação express
const router = express.Router();


//Criar a Lista 
router.get("/product-categories", async(req: Request, res: Response)=>{
    try {
        //Obter o repositório da entidade ProductCategory
        const productCategoryRepository = AppDataSource.getRepository(ProductCategory);

        //Receber o numero da pagina e definir pagina 1 como padrão
        const page = Number(req.query.page) || 1;
        
        //Definir o limite de registros por página 
        const limit = Number(req.query.limit) || 10;

        const result = await PaginationService.paginate(
            productCategoryRepository, page, limit, {id: "DESC"});

        //Retornar a resposta com os dados e informações de paginação

        res.status(200).json(result);
        return;
    
    }catch (error) {
        res.status(500).json({ 
            message: "Erro ao listar categorias de produtos" 
        });
        return;
    }
});

//Criar a visualização do item cadastrado em categoria de produto
router.get("/product-categories/:id", async(req: Request<{ id: string }>, res: Response)=>{
    try {
        
        const { id } = req.params;
        
        const productCategoryRepository = AppDataSource.getRepository(ProductCategory);

        const productCategory = await productCategoryRepository.findOneBy({id: parseInt(id)});

        if(!productCategory){
            res.status(404).json({
                message: "Categoria de produto não encontrada"});
            return;
        }

        res.status(200).json(productCategory);
        return;
    
    }catch (error) {
        res.status(500).json({ 
            message: "Erro ao visualizar categoria de produto" 
        });
        return;
    }
});

//Criar rota POST 
router.post("/product-categories", async (req: Request, res: Response)=>{

    try {
        var data = req.body;
        console.log(req.body);

        const productCategoryRepository = AppDataSource.getRepository(ProductCategory);
        
        const newProductCategory = productCategoryRepository.create(data);

        await productCategoryRepository.save(newProductCategory);

        res.status(201).json({
            message: "Categoria de produto cadastrada com sucesso",
            productCategory: newProductCategory,
        });

    } catch (error) {
        res.status(500).json({ 
            message: "Erro ao cadastrar categoria de produto" 
        });
    }
});

//Criar rota PUT
router.put("/product-categories/:id", async(req: Request<{ id: string }>, res: Response)=>{
    try {
        
        const { id } = req.params;

        var data = req.body;
        
        const productCategoryRepository = AppDataSource.getRepository(ProductCategory);

        const productCategory = await productCategoryRepository.findOneBy({id: parseInt(id)});

        if(!productCategory){
            res.status(404).json({
                message: "Categoria de produto não encontrada"});
            return;
        }
        //Atualiza os dados 
        productCategoryRepository.merge(productCategory, data);
        //Salvar as alterações de dados
        const updatedProductCategory = await productCategoryRepository.save(productCategory);

        res.status(200).json({
            message: "Categoria de produto atualizada com sucesso",
            productCategory: updatedProductCategory
        });
        return;
    
    }catch (error) {
        res.status(500).json({ 
            message: "Erro ao atualizar categoria de produto" 
        });
        return;
    }
});

//Criar rota DELETE
router.delete("/product-categories/:id", async(req: Request<{ id: string }>, res: Response)=>{
    try {
        
        const { id } = req.params;
        
        const productCategoryRepository = AppDataSource.getRepository(ProductCategory);

        const productCategory = await productCategoryRepository.findOneBy({id: parseInt(id)});

        if(!productCategory){
            res.status(404).json({
                message: "Categoria de produto não encontrada"});
            return;
        }
        //Remover os dados no banco de dados
        await productCategoryRepository.remove(productCategory);

        res.status(200).json({
            message: "Categoria de produto removida com sucesso"
        });
        return;
    
    }catch (error) {
        res.status(500).json({ 
            message: "Erro ao remover categoria de produto" 
        });
        return;
    }
});
//Exportar instruçoes da rota 
export default router 