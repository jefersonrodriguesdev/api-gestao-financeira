import { AppDataSource } from "../data-source";
import { Transacao } from "../entity/Transacao";

export class TransacaoService {

    private repo = AppDataSource.getRepository(Transacao);

    async lancar(dados: Partial<Transacao>): Promise<Transacao> {

        return await this.repo.save(dados as Transacao);
    }

    async listarPorUsuario(usuarioId: string): Promise<Transacao[]> {

        return await this.repo.find({
            where: {
                usuario: {
                    id: usuarioId
                }
            },
            relations: ["categoria"]
        });
    }

    async calcularSaldo(usuarioId: string) {

        const transacoes = await this.repo.find({
            where: {
                usuario: {
                    id: usuarioId
                }
            },
            relations: ["categoria"]
        });

        const saldo = transacoes.reduce((acc, t) => {

            return t.categoria.tipo === "entrada"
                ? acc + Number(t.valor)
                : acc - Number(t.valor);

        }, 0);

        return { saldo };
    }
}