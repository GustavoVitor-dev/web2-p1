import {DataSource} from "typeorm";
import { Product } from "../entity/Products";

export default class CreateProductSeeds {

    public async run(dataSource: DataSource): Promise<void> {
        console.log("Iniciando o seed para a tabela products...");

        const productRepository = dataSource.getRepository(Product);

        const existingCount = await productRepository.count();

        if (existingCount > 0) {
            console.log("A tabela products já possui dados. Nenhuma alteração foi realizada.");
            return;
        }

        const products = [
            {name: "Notebook", productSituation: {id: 1}, productCategory: {id: 1}},
            {name: "Camiseta", productSituation: {id: 2}, productCategory: {id: 2}},
            {name: "Arroz", productSituation: {id: 3}, productCategory: {id: 3}},
        ]

        await productRepository.save(products);

        console.log("Seed para a tabela products concluído com sucesso!");
    }
}

