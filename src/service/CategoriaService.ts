import { AppDataSource } from "../data-source";
import { Categoria } from "../entity/Categoria";
import { AppError } from "../errors/AppError";

export class CategoriaService {
    private repo = AppDataSource.getRepository(Categoria);

    async criar(nome: string, tipo: string): Promise<Categoria> {
        if (!nome || !tipo) {
            throw new AppError("Nome e tipo são obrigatórios", 400);
        }

        const nomeFormatado = nome.trim();
        const existe = await this.repo.findOneBy({ nome: nomeFormatado });
        
        if (existe) {
            throw new AppError("Categoria já existe", 400);
        }

        const categoria = this.repo.create({ nome: nomeFormatado, tipo });
        return await this.repo.save(categoria);
    }

    async listar(): Promise<Categoria[]> {
        return await this.repo.find();
    }
}