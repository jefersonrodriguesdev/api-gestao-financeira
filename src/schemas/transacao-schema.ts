import { z } from "zod";

export const transacaoSchema = z.object({
    descricao: z.string().min(3, "Descrição obrigatória"),
    valor: z.coerce.number().positive("O valor deve ser positivo"),
    categoriaId: z.coerce.number().int().positive("ID da categoria inválido"),
    tags: z.union([z.string(), z.array(z.any())]).optional()
});