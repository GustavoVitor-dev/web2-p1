import { AppDataSource } from "./data-source";
import CreateSituationSeeds from "./seeds/CreateSituationSeeds";

const runSeeds = async () => {
    console.log("Conectando ao banco de dados...")
    
    await AppDataSource.initialize();
    
    console.log("Conexão com o banco de dados estabelecida com sucesso!");

    try{
        //Cria a instancia da classes de seed

        const situationsSeeds = new CreateSituationSeeds();

        //Executa o seed 
        await situationsSeeds.run(AppDataSource);

    }catch (error) {

        console.log("Erro ao executar o seed:", error);
     
    }finally {

        await AppDataSource.destroy();
        console.log("Conexão com o banco de dados encerrada.");
    }
};

runSeeds();