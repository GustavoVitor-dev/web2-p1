import {DataSource} from "typeorm";
import { User } from "../entity/Users";
import { Situation } from "../entity/Situations";

export default class CreateUserSeeds {

    public async run(dataSource: DataSource): Promise<void> {
        console.log("Iniciando o seed para a tabela users...");

        //Obter o repositório da entidade User e Situation
        const userRepository = dataSource.getRepository(User);
        const situationRepository = dataSource.getRepository(Situation);

        //Verifica se já existem registros na tabela
        const existingCount = await userRepository.count();

        if (existingCount > 0) {
            console.log("A tabela users já possui dados. Nenhuma alteração foi realizada.");
            return;
        }

        //Buscar a Situação no banco de dados
        const situation = await situationRepository.findOneBy({ id: 1 });

        //Verificar se encontrou a situação no banco de dados
        if (!situation) {
            console.log("Erro: Nenhuma situação encontrada com o id 1.Verifique se a tabela 'Situations' está populada corretamente antes de executar o seed para a tabela 'Users'.");
            return;
        }

        //Criar os Usuários com a referência correta à Situação

        const users = [
            {
                id: 1,
                name: "Adriano Baião",
                email: "baiao@baiao.com.br",
                situation: situation
            },
            {
                id: 2,
                name: "Maria Silva",
                email: "maria@example.com",
                situation: situation
            }
        
        ];

        //Salvar os usuários no banco de dados

        await userRepository.save(users);

        console.log("Seed para a tabela users concluído com sucesso!");
    }
}

