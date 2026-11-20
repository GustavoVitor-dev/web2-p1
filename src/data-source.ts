import "reflect-metadata";
import { DataSource } from "typeorm";
import dotenv from "dotenv";
import { Situation } from "./entity/Situations";
import { User } from "./entity/Users";
import { ProductSituation } from "./entity/ProductSituations";
import { ProductCategory } from "./entity/ProductCategories";
import { Product } from "./entity/Products";

dotenv.config();

    const dialect = process.env.DB_DIALECT ?? "mysql"
export const AppDataSource = new DataSource({
    type: dialect as "mysql" | "mariadb" | "postgres" | "mongodb",
    host: process.env.DB_HOST,
    port: process.env.DB_PORT ? parseInt(process.env.DB_PORT) : 3306,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    synchronize: false,
    logging: true,
    entities: [Situation, User, ProductSituation, ProductCategory, Product],
    subscribers: [],
    migrations: [__dirname + "/migration/*.js"],
});
//Inicializar a conexão com o banco de dados
AppDataSource.initialize().then(()=>{
    console.log("conexão do banco de dados realizada com sucesso!")
}).catch((error)=>{
    console.log("Erro na conexão com o banco de dados ")
})
