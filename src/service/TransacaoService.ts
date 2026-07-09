import { AppDataSource } from "../data-source";
import { Transacao } from "../entity/Transacao";
import { Tag } from "../entity/Tag"; // 
import { In } from "typeorm"; // 
import { AppError } from "../errors/AppError";

export class TransacaoService {
    private repo = AppDataSource.getRepository(Transacao);
    private tagRepo = AppDataSource.getRepository(Tag); // 🟢 Criamos o repositório de Tags

    async criar(dados: any): Promise<Transacao> {
        if (!dados.valor || !dados.categoriaId) {
            throw new AppError("Valor e Categoria são obrigatórios", 400);
        }

        if (dados.valor <= 0) {
            throw new AppError("O valor da transação deve ser maior que zero", 400);
        }

        let tagsDoBanco: Tag[] = [];
        if (dados.tags && dados.tags.length > 0) {
            const ids = dados.tags.map((t: any) => Number(t.id));
            tagsDoBanco = await this.tagRepo.findBy({ id: In(ids) });
        }

        const transacao = this.repo.create({
            descricao: dados.descricao,
            valor: Number(dados.valor),
            comprovantePath: dados.comprovantePath,
            tags: tagsDoBanco, // 🟢 Passamos as entidades perfeitas e seguras
            usuario: { id: Number(dados.usuarioId) },
            categoria: { id: Number(dados.categoriaId) },
            data: dados.data ? new Date(dados.data) : new Date(),
        } as Transacao);

        return await this.repo.save(transacao);
    }

    async listarPorUsuario(usuarioId: number): Promise<Transacao[]> {
        return await this.repo.find({
            where: { usuario: { id: usuarioId } },
            relations: ["categoria", "tags"],
            order: { data: "DESC" }
        });
    }

    async calcularSaldo(usuarioId: number) {
        const transacoes = await this.repo.find({
            where: { usuario: { id: usuarioId } },
            relations: ["categoria"]
        });

        const saldo = transacoes.reduce((acc, t) => {
            const valor = Number(t.valor);
            return t.categoria.tipo === "entrada" ? acc + valor : acc - valor;
        }, 0);

        return {
            usuarioId,
            saldo: saldo.toFixed(2),
            totalTransacoes: transacoes.length
        };
    }

    async deletar(id: number, usuarioId: number): Promise<void> {
        const transacao = await this.repo.findOne({
            where: { id, usuario: { id: usuarioId } }
        });

        if (!transacao) {
            throw new AppError("Transação não encontrada ou acesso negado", 404);
        }

        await this.repo.remove(transacao);
    }
}