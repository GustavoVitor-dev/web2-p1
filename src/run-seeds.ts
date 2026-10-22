import { AppDataSource } from "./data-source";
import CreateSituationSeeds from "./seeds/CreateSituationSeeds";
import CreateUserSeeds from "./seeds/CreateUserSeeds";

const runSeeds = async () => {
    console.log("Conectando ao banco de dados...")
    
    await AppDataSource.initialize();
    
    console.log("Conexão com o banco de dados estabelecida com sucesso!");

    try{
        //Cria a instancia da classes de seed

        const situationsSeeds = new CreateSituationSeeds();
        const usersSeeds = new CreateUserSeeds();

        //Executa o seed 
        await situationsSeeds.run(AppDataSource);
        await usersSeeds.run(AppDataSource);

    }catch (error) {

        console.log("Erro ao executar o seed:", error);
     
    }finally {

        await AppDataSource.destroy();
        console.log("Conexão com o banco de dados encerrada.");
    }
};

runSeeds();