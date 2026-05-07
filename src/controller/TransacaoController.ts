import { Request, Response } from "express";
import { TransacaoService } from "../service/TransacaoService";

export class TransacaoController {

    private service = new TransacaoService();

    inserir = async (req: Request, res: Response) => {

        try {

            const dados = req.body;

            dados.usuario = {
                id: (req as any).user.id
            };

            dados.categoria = {
                id: Number(req.body.categoria)
            };

            if (req.file) {
                dados.comprovantePath = req.file.path;
            }

            const nova = await this.service.lancar(dados);

            return res.status(201).json(nova);

        } catch (err: any) {

            return res.status(500).json({
                error: err.message || "Erro ao lançar transação"
            });
        }
    };

    listarLogado = async (req: Request, res: Response) => {

        try {

            const usuarioId = (req as any).user.id;

            const transacoes =
                await this.service.listarPorUsuario(usuarioId);

            return res.json(transacoes);

        } catch (err: any) {

            return res.status(500).json({
                error: "Erro ao listar transações"
            });
        }
    };

    obterSaldoLogado = async (
        req: Request,
        res: Response
    ) => {

        try {

            const usuarioId = (req as any).user.id;

            const saldo =
                await this.service.calcularSaldo(usuarioId);

            return res.json(saldo);

        } catch (err: any) {

            return res.status(500).json({
                error: "Erro ao calcular saldo"
            });
        }
    };
//deleta as transações, mas só as do usuário logado
    deletar = async (req: Request, res: Response) => {

        try {

            const id = Number(req.params.id);

            const usuarioId = (req as any).user.id;

            const resultado =
                await this.service.deletar(id, usuarioId);

            return res.json(resultado);

        } catch (err: any) {

            return res.status(500).json({
                error: err.message
            });
        }
    };
}