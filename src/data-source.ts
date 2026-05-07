import { DataSource } from "typeorm";
import { Usuario } from "./entity/Usuario";
import { Categoria } from "./entity/Categoria";
import { Transacao } from "./entity/Transacao"; // O Alves criará esta

export const AppDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "1012", // Ajuste conforme seu banco
    database: "gestao_financeira",
    entities: [Usuario, Categoria, Transacao],
    synchronize: true, // Ótimo para desenvolvimento
    logging: true,
});