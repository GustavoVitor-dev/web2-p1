"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppDataSource = void 0;
require("reflect-metadata");
const typeorm_1 = require("typeorm");
const dotenv_1 = __importDefault(require("dotenv"));
const Situations_1 = require("./entity/Situations");
const Users_1 = require("./entity/Users");
dotenv_1.default.config();
const dialect = (_a = process.env.DB_DIALECT) !== null && _a !== void 0 ? _a : "mysql";
exports.AppDataSource = new typeorm_1.DataSource({
    type: dialect,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT ? parseInt(process.env.DB_PORT) : 3306,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    synchronize: false,
    logging: true,
    entities: [Situations_1.Situation, Users_1.User],
    subscribers: [],
    migrations: [__dirname + "/migration/*.js"],
});
//Inicializar a conexão com o banco de dados
exports.AppDataSource.initialize().then(() => {
    console.log("conexão do banco de dados realizada com sucesso!");
}).catch((error) => {
    console.log("Erro na conexão com o banco de dados ");
});
