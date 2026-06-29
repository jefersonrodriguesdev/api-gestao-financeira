import "reflect-metadata";
import express from "express";
import usuarioRouter from "./router/usuario-router";
import { AppDataSource } from "./data-source";
import authRouter from "./router/auth-router";
import transacaoRouter from "./router/transacao-router";
import categoriaRouter from "./router/categoria-router"; // Espaço removido
import tagRouter from "./router/tag-router";
import { errorMiddleware } from "./middleware/error-middleware";

const app = express();

app.use(express.json());

app.use("/api/usuarios", usuarioRouter);
app.use("/api/auth", authRouter);
app.use("/api/transacoes", transacaoRouter);
app.use("/api/categorias", categoriaRouter);
app.use("/api/tags", tagRouter);

app.use(errorMiddleware);

export default app;

AppDataSource.initialize().then(() => {
    app.listen(3000, () => {
        console.log("Servidor de Gestão Financeira rodando na porta 3000");
    });
}).catch(error => {
    console.log("Erro ao conectar no banco:", error);
});