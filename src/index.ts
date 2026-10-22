import express from "express";
import dotenv from "dotenv";

dotenv.config();

const app = express();
//incluir os Controllers

//Middleware
app.use(express.json());

import AuthController from"./controllers/AuthController";
import SituationsController from "./controllers/SituationsController";
import UsersController from "./controllers/UsersController";
import ProductSituationsController from "./controllers/ProductSituationsController";
import ProductCategoriesController from "./controllers/ProductCategoriesController";
import ProductsController from "./controllers/ProductsController";

//Criar as rotas
app.use('/', AuthController)
app.use('/', SituationsController)
app.use('/', UsersController)
app.use('/', ProductSituationsController)
app.use('/', ProductCategoriesController)
app.use('/', ProductsController)


app.listen(process.env.PORT, ()=>{
    console.log(`Servidor iniciado na porta ${process.env.PORT}: http://localhost:${process.env.PORT}`)
});
