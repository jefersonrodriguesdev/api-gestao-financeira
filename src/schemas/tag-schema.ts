import { z } from "zod";

export const tagSchema = z.object({
    nome: z.string().min(2, "O nome da tag deve ter pelo menos 2 caracteres").max(30, "Nome da tag muito longo"),
});