import {DataSource} from "typeorm";
import { ProductCategory } from "../entity/ProductCategories";

export default class CreateProductCategorySeeds {

    public async run(dataSource: DataSource): Promise<void> {
        console.log("Iniciando o seed para a tabela product_categories...");

        const productCategoryRepository = dataSource.getRepository(ProductCategory);

        const existingCount = await productCategoryRepository.count();

        if (existingCount > 0) {
            console.log("A tabela product_categories já possui dados. Nenhuma alteração foi realizada.");
            return;
        }

        const productCategories = [
            {name: "Eletrônicos"},
            {name: "Roupas"},
            {name: "Alimentos"},
        ]

        await productCategoryRepository.save(productCategories);

        console.log("Seed para a tabela product_categories concluído com sucesso!");
    }
}

