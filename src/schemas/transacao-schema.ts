import { z } from "zod";

export const transacaoSchema = z.object({
    descricao: z.string().min(3, "Descrição obrigatória"),
    valor: z.number().positive("O valor deve ser positivo"),
    categoriaId: z.number().int().positive("ID da categoria inválido"),
    tags: z.array(z.object({ id: z.number() })).optional()
});