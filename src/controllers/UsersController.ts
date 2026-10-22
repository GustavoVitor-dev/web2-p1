//Importar Biblioteca Express
import express, {Request, Response} from "express";
import { User } from "../entity/Users";
import { AppDataSource } from "../data-source";
import { PaginationService } from "../services/PaginationServices";
//Criar aplicação express
const router = express.Router();


//Criar a Lista 
router.get("/users", async(req: Request, res: Response)=>{
    try {
        //Obter o repositório da entidade User
        const userRepository = AppDataSource.getRepository(User);

        //Receber o numero da pagina e definir pagina 1 como padrão
        const page = Number(req.query.page) || 1;
        
        //Definir o limite de registros por página 
        const limit = Number(req.query.limit) || 10;

        const result = await PaginationService.paginate(
            userRepository, page, limit, {id: "DESC"}, {situation: true});

        //Retornar a resposta com os dados e informações de paginação

        res.status(200).json(result);
        return;
    
    }catch (error) {
        res.status(500).json({ 
            message: "Erro ao listar usuários" 
        });
        return;
    }
});

//Criar a visualização do item cadastrado em usuário
router.get("/users/:id", async(req: Request<{ id: string }>, res: Response)=>{
    try {
        
        const { id } = req.params;
        
        const userRepository = AppDataSource.getRepository(User);

        const user = await userRepository.findOne({where: {id: parseInt(id)}, relations: {situation: true}});

        if(!user){
            res.status(404).json({
                message: "Usuário não encontrado"});
            return;
        }

        res.status(200).json(user);
        return;
    
    }catch (error) {
        res.status(500).json({ 
            message: "Erro ao visualizar usuário" 
        });
        return;
    }
});

//Criar rota POST 
router.post("/users", async (req: Request, res: Response)=>{

    try {
        var data = req.body;
        console.log(req.body);

        const userRepository = AppDataSource.getRepository(User);
        
        const newUser = userRepository.create(data);

        await userRepository.save(newUser);

        res.status(201).json({
            message: "Usuário cadastrado com sucesso",
            user: newUser,
        });

    } catch (error) {
        res.status(500).json({ 
            message: "Erro ao cadastrar usuário" 
        });
    }
});

//Criar rota PUT
router.put("/users/:id", async(req: Request<{ id: string }>, res: Response)=>{
    try {
        
        const { id } = req.params;

        var data = req.body;
        
        const userRepository = AppDataSource.getRepository(User);

        const user = await userRepository.findOneBy({id: parseInt(id)});

        if(!user){
            res.status(404).json({
                message: "Usuário não encontrado"});
            return;
        }
        //Atualiza os dados 
        userRepository.merge(user, data);
        //Salvar as alterações de dados
        const updatedUser = await userRepository.save(user);

        res.status(200).json({
            message: "Usuário atualizado com sucesso",
            user: updatedUser
        });
        return;
    
    }catch (error) {
        res.status(500).json({ 
            message: "Erro ao atualizar usuário" 
        });
        return;
    }
});

//Criar rota DELETE
router.delete("/users/:id", async(req: Request<{ id: string }>, res: Response)=>{
    try {
        
        const { id } = req.params;
        
        const userRepository = AppDataSource.getRepository(User);

        const user = await userRepository.findOneBy({id: parseInt(id)});

        if(!user){
            res.status(404).json({
                message: "Usuário não encontrado"});
            return;
        }
        //Remover os dados no banco de dados
        await userRepository.remove(user);

        res.status(200).json({
            message: "Usuário removido com sucesso"
        });
        return;
    
    }catch (error) {
        res.status(500).json({ 
            message: "Erro ao remover usuário" 
        });
        return;
    }
});
//Exportar instruçoes da rota 
export default router 