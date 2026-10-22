import {DataSource} from "typeorm";
import { ProductSituation } from "../entity/ProductSituations";

export default class CreateProductSituationSeeds {

    public async run(dataSource: DataSource): Promise<void> {
        console.log("Iniciando o seed para a tabela product_situations...");

        const productSituationRepository = dataSource.getRepository(ProductSituation);

        const existingCount = await productSituationRepository.count();

        if (existingCount > 0) {
            console.log("A tabela product_situations já possui dados. Nenhuma alteração foi realizada.");
            return;
        }

        const productSituations = [
            {name: "Ativo"},
            {name: "Inativo"},
            {name: "Esgotado"},
        ]

        await productSituationRepository.save(productSituations);

        console.log("Seed para a tabela product_situations concluído com sucesso!");
    }
}

