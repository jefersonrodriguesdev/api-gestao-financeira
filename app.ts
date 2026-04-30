import "reflect-metadata";
import express from "express";
import { AppDataSource } from "./data-source";
import authRouter from "./router/auth-router";

const app = express();
app.use(express.json());

AppDataSource.initialize().then(() => {
    app.use("/api/auth", authRouter);
    
    app.listen(3000, () => {
        console.log("Servidor de Gestão Financeira rodando na porta 3000");
    });
}).catch(error => console.log("Erro ao conectar no banco:", error));