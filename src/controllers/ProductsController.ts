//Importar Biblioteca Express
import express, {Request, Response} from "express";
import { Product } from "../entity/Products";
import { AppDataSource } from "../data-source";
import { PaginationService } from "../services/PaginationServices";
//Criar aplicação express
const router = express.Router();


//Criar a Lista 
router.get("/products", async(req: Request, res: Response)=>{
    try {
        //Obter o repositório da entidade Product
        const productRepository = AppDataSource.getRepository(Product);

        //Receber o numero da pagina e definir pagina 1 como padrão
        const page = Number(req.query.page) || 1;
        
        //Definir o limite de registros por página 
        const limit = Number(req.query.limit) || 10;

        const result = await PaginationService.paginate(
            productRepository, page, limit, {id: "DESC"}, {productSituation: true, productCategory: true});

        //Retornar a resposta com os dados e informações de paginação

        res.status(200).json(result);
        return;
    
    }catch (error) {
        res.status(500).json({ 
            message: "Erro ao listar produtos" 
        });
        return;
    }
});

//Criar a visualização do item cadastrado em produto
router.get("/products/:id", async(req: Request<{ id: string }>, res: Response)=>{
    try {
        
        const { id } = req.params;
        
        const productRepository = AppDataSource.getRepository(Product);

        const product = await productRepository.findOne({where: {id: parseInt(id)}, relations: {productSituation: true, productCategory: true}});

        if(!product){
            res.status(404).json({
                message: "Produto não encontrado"});
            return;
        }

        res.status(200).json(product);
        return;
    
    }catch (error) {
        res.status(500).json({ 
            message: "Erro ao visualizar produto" 
        });
        return;
    }
});

//Criar rota POST 
router.post("/products", async (req: Request, res: Response)=>{

    try {
        var data = req.body;
        console.log(req.body);

        const productRepository = AppDataSource.getRepository(Product);
        
        const newProduct = productRepository.create(data);

        await productRepository.save(newProduct);

        res.status(201).json({
            message: "Produto cadastrado com sucesso",
            product: newProduct,
        });

    } catch (error) {
        res.status(500).json({ 
            message: "Erro ao cadastrar produto" 
        });
    }
});

//Criar rota PUT
router.put("/products/:id", async(req: Request<{ id: string }>, res: Response)=>{
    try {
        
        const { id } = req.params;

        var data = req.body;
        
        const productRepository = AppDataSource.getRepository(Product);

        const product = await productRepository.findOneBy({id: parseInt(id)});

        if(!product){
            res.status(404).json({
                message: "Produto não encontrado"});
            return;
        }
        //Atualiza os dados 
        productRepository.merge(product, data);
        //Salvar as alterações de dados
        const updatedProduct = await productRepository.save(product);

        res.status(200).json({
            message: "Produto atualizado com sucesso",
            product: updatedProduct
        });
        return;
    
    }catch (error) {
        res.status(500).json({ 
            message: "Erro ao atualizar produto" 
        });
        return;
    }
});

//Criar rota DELETE
router.delete("/products/:id", async(req: Request<{ id: string }>, res: Response)=>{
    try {
        
        const { id } = req.params;
        
        const productRepository = AppDataSource.getRepository(Product);

        const product = await productRepository.findOneBy({id: parseInt(id)});

        if(!product){
            res.status(404).json({
                message: "Produto não encontrado"});
            return;
        }
        //Remover os dados no banco de dados
        await productRepository.remove(product);

        res.status(200).json({
            message: "Produto removido com sucesso"
        });
        return;
    
    }catch (error) {
        res.status(500).json({ 
            message: "Erro ao remover produto" 
        });
        return;
    }
});
//Exportar instruçoes da rota 
export default router 