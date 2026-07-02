import { z } from "zod";

export const categoriaSchema = z.object({
    nome: z.string().min(2, "O nome da categoria é obrigatório"),
    tipo: z.enum(["entrada", "saida"], { 
        message: "Tipo deve ser 'entrada' ou 'saida'" 
    })
});