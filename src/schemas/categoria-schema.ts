import { z } from "zod";

export const categoriaSchema = z.object({
    nome: z.string().min(2, "O nome da categoria é obrigatório"),
    tipo: z.enum(["entrada", "saida"], { required_error: "Tipo deve ser 'entrada' ou 'saida'" })
});