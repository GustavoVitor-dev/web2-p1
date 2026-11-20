import {DataSource} from "typeorm";
import { User } from "../entity/Users";

export default class CreateUserSeeds {

    public async run(dataSource: DataSource): Promise<void> {
        console.log("Iniciando o seed para a tabela users...");

        const userRepository = dataSource.getRepository(User);

        const existingCount = await userRepository.count();

        if (existingCount > 0) {
            console.log("A tabela users já possui dados. Nenhuma alteração foi realizada.");
            return;
        }

        const users = [
            {name: "Ana Souza", email: "ana@example.com", situation: {id: 1}},
            {name: "Bruno Lima", email: "bruno@example.com", situation: {id: 2}},
            {name: "Carla Mendes", email: "carla@example.com", situation: {id: 3}},
        ]

        await userRepository.save(users);

        console.log("Seed para a tabela users concluído com sucesso!");
    }
}

