import { z } from "zod";

export const authSchema = z.object({
    email: z.string().email("Formato de email inválido"),
    senha: z.string().min(1, "A senha é obrigatória"),
});