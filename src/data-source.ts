import { DataSource } from "typeorm";
import { Usuario } from "./entity/Usuario";
import { Categoria } from "./entity/Categoria";
import { Transacao } from "./entity/Transacao"; 
import { Tag } from "./entity/Tag";

export const AppDataSource = new DataSource({
    type: "postgres",
    url: process.env.DATABASE_URL,
    host: process.env.DATABASE_URL ? undefined : "localhost",
    port: process.env.DATABASE_URL ? undefined : 5432,
    username: process.env.DATABASE_URL ? undefined : "postgres",
    password: process.env.DATABASE_URL ? undefined : "1012", 
    database: process.env.DATABASE_URL ? undefined : "gestao_financeira",
    
    entities: [Usuario, Categoria, Transacao, Tag],
    synchronize: true, 
    logging: process.env.DATABASE_URL ? false : true,
    ssl: process.env.DATABASE_URL ? { rejectUnauthorized: false } : false
});