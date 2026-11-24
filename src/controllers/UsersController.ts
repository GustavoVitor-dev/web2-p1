//Importar Biblioteca Express
import express, {Request, Response} from "express";
import { User } from "../entity/Users";
import { AppDataSource } from "../data-source";
import { PaginationService } from "../services/PaginationServices";
import * as yup from "yup";
import { Not } from "typeorm";
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
        
        const schema = yup.object().shape({
            name: yup.string().required("O nome é obrigatório").min(3, "O nome deve ter no mínimo 3 caracteres"),
            email: yup.string().email("O email deve ser válido").required("O email é obrigatório"),
            situation : yup.number().required("A situação é obrigatória"),
        });

        //Verificar se os dados passaram pela validação
        await schema.validate(data, {abortEarly: false});
        
        //Criar uma instancia do repositório de User
        const userRepository = AppDataSource.getRepository(User);

        //Recuperar o registro do banco de dados com o valor da coluna email
        const existingUser = await userRepository.findOne({
            where: { email: data.email }
        });
        
        if (existingUser) {
            res.status(400).json({
                message: "Ja existe um usuário com esse email"
            });
            return;
        }

       // Criar um novo registro
        const newUser = userRepository.create(data);

        //Salvar registro no banco de dados
        await userRepository.save(newUser);

        //Retornar resposta de sucesso 
        res.status(201).json({
            message: "Usuário cadastrado com sucesso",
            user: newUser,
        });

    } catch (error) {
        if (error instanceof yup.ValidationError) {
        //Retornar erros de validação
        res.status(400).json({ 
            message: error.errors
        });
        return;
    }

    //Retornar erro em caso de falha
    res.status(500).json({ 
        message: "Erro ao cadastrar usuário"
    });
    }
});


//Criar rota PUT
router.put("/users/:id", async(req: Request<{ id: string }>, res: Response)=>{
    try {
        
        const { id } = req.params;

        const data = req.body;

        //Validar os dados utilizando o yup
        const schema = yup.object().shape({
            name: yup.string().required("O nome é obrigatório").min(3, "O nome deve ter no mínimo 3 caracteres"),
            email: yup.string().email("O email deve ser válido").required("O email é obrigatório"),
            situation : yup.number().required("A situação é obrigatória"),
        });
        
        //Verificar se os dados passaram pela validação
        await schema.validate(data, {abortEarly: false});

        //Obter o repositório da entidade User
        const userRepository = AppDataSource.getRepository(User);

        //Buscar o usuário no banco de dados pelo ID
        const user = await userRepository.findOneBy({id: parseInt(id)});

        //Verificar se o usuário foi encontrado
        if(!user){
            res.status(404).json({
                message: "Usuário não encontrado"});
            return;
        }

        //Verificar se já existe outro usuário com o mesmo email, mas que nao seja o registro atual
        const existingUser = await userRepository.findOne({
            where: { 
                email: data.email, 
                id: Not(parseInt(id)) // Exclui o próprio registro de busca 
            },
        });
        //Atualiza os dados 
        userRepository.merge(user, data);
        //Salvar as alterações de dados
        const updatedUser = await userRepository.save(user);
        //Retornar resposta de sucesso
        res.status(200).json({
            message: "Usuário atualizado com sucesso",
            user: updatedUser
        });
        
    } catch (error) {
        if (error instanceof yup.ValidationError) {
            //Retornar erros de validação
            res.status(400).json({ 
                message: error.errors
            });
            return;
        }
        //Retornar erro em caso de falha
        res.status(500).json({ 
            message: "Erro ao atualizar usuário"
        });
    }
    
});

//Criar rota DELETE
router.delete("/users/:id", async(req: Request<{ id: string }>, res: Response)=>{
    try {
        
        const { id } = req.params;
        
        const userRepository = AppDataSource.getRepository(User);

        const user = await userRepository.findOneBy({ id: parseInt(id) });

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