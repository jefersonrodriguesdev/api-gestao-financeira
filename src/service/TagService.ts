import { AppDataSource } from "../data-source";
import { Tag } from "../entity/Tag";

export class TagService {
    private repo = AppDataSource.getRepository(Tag);

    async criar(nome: string): Promise<Tag> {
        if (!nome) throw { id: 400, msg: "O nome da tag é obrigatório" };
        
        const nomeFormatado = nome.toLowerCase().trim();
        const existe = await this.repo.findOneBy({ nome: nomeFormatado });
        
        if (existe) throw { id: 400, msg: "Tag já existe" };

        const tag = this.repo.create({ nome: nomeFormatado });
        return await this.repo.save(tag);
    }

    async listarTodas(): Promise<Tag[]> {
        return await this.repo.find();
    }
}