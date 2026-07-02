import { AppDataSource } from "../data-source";
import { Transacao } from "../entity/Transacao";
import { AppError } from "../errors/AppError";

export class TransacaoService {
    private repo = AppDataSource.getRepository(Transacao);

    async criar(dados: any): Promise<Transacao> {
        if (!dados.valor || !dados.categoriaId) {
            throw new AppError("Valor e Categoria são obrigatórios", 400);
        }

        if (dados.valor <= 0) {
            throw new AppError("O valor da transação deve ser maior que zero", 400);
        }

        const transacao = this.repo.create({
            descricao: dados.descricao,
            valor: dados.valor,
            comprovantePath: dados.comprovantePath,
            tags: dados.tags,
            usuario: { id: dados.usuarioId },
            categoria: { id: dados.categoriaId },
            data: dados.data || new Date(),
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