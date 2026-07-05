import "reflect-metadata";
import express from "express";
import path from "path";
import usuarioRouter from "./router/usuario-router";
import { AppDataSource } from "./data-source";
import authRouter from "./router/auth-router";
import transacaoRouter from "./router/transacao-router";
import categoriaRouter from "./router/categoria-router"; // Espaço removido
import tagRouter from "./router/tag-router";
import { errorMiddleware } from "./middleware/error-middleware";

const app = express();

app.use(express.json());

app.use("/uploads", express.static(path.resolve(__dirname, "..", "uploads")));

app.use("/api/usuarios", usuarioRouter);
app.use("/api/auth", authRouter);
app.use("/api/transacoes", transacaoRouter);
app.use("/api/categorias", categoriaRouter);
app.use("/api/tags", tagRouter);

app.use(errorMiddleware);

export default app;

AppDataSource.initialize().then(() => {
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
        console.log(`Servidor de Gestão Financeira rodando na porta ${PORT}`);
    });
}).catch(error => {
    console.log("Erro ao conectar no banco:", error);
});