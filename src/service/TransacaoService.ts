import { AppDataSource } from "../data-source";
import { Transacao } from "../entity/Transacao";

export class TransacaoService {
    private repo = AppDataSource.getRepository(Transacao);

    async lancar(dados: Partial<Transacao>): Promise<Transacao> {
        if (!dados.valor || !dados.categoria) {
            throw { id: 400, msg: "Valor e Categoria são obrigatórios" };
        }
        
        // Garante que a data seja gravada se não enviada
        if (!dados.data) dados.data = new Date();

        return await this.repo.save(dados as Transacao);
    }

    async listarPorUsuario(usuarioId: number): Promise<Transacao[]> {
        return await this.repo.find({
            where: { usuario: { id: usuarioId } },
            relations: ["categoria"],
            order: { data: "DESC" } // Organiza por data mais recente
        });
    }

    async calcularSaldo(usuarioId: number) {
        const transacoes = await this.repo.find({
            where: { usuario: { id: usuarioId } },
            relations: ["categoria"]
        });

        const saldo = transacoes.reduce((acc, t) => {
            // Converte para Number para evitar erros de string no decimal
            const valor = Number(t.valor);
            return t.categoria.tipo === "entrada" ? acc + valor : acc - valor;
        }, 0);

        return { 
            usuarioId,
            saldo: saldo.toFixed(2),
            totalTransacoes: transacoes.length 
        };
    }
    async deletar(id: number, usuarioId: number) {

    const transacao = await this.repo.findOne({
        where: {
            id,
            usuario: {
                id: usuarioId
            }
        }
    }
    );

    if (!transacao) {
        throw new Error("Transação não encontrada");//deleta ass contas 
    }

    await this.repo.remove(transacao);

    return {
        message: "Transação removida com sucesso"
    };
}
}