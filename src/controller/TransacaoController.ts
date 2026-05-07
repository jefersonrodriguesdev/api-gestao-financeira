import { Request, Response } from "express";
import { TransacaoService } from "../service/TransacaoService";

export class TransacaoController {

    private service = new TransacaoService();

    inserir = async (req: Request, res: Response) => {
        try {
            const dados = req.body;

            if (req.file) {
                dados.comprovantePath = req.file.path;
            }

            const nova = await this.service.lancar(dados);

            return res.status(201).json(nova);
        } catch (err: any) {
            console.error(err);
            return res.status(500).json({
                error: "Erro ao lançar transação"
            });
        }
    };

    listarPorUsuario = async (req: Request, res: Response) => {
        try {
            const usuarioId = Array.isArray(req.params.usuarioId) ? req.params.usuarioId[0] : req.params.usuarioId;

            const transacoes = await this.service.listarPorUsuario(usuarioId);

            return res.json(transacoes);
        } catch (err: any) {
            console.error(err);
            return res.status(500).json({
                error: "Erro ao listar transações"
            });
        }
    };

    obterSaldo = async (req: Request, res: Response) => {
        try {
            const usuarioId = Array.isArray(req.params.usuarioId) ? req.params.usuarioId[0] : req.params.usuarioId;

            const saldo = await this.service.calcularSaldo(usuarioId);

            return res.json(saldo);
        } catch (err: any) {
            console.error(err);
            return res.status(500).json({
                error: "Erro ao calcular saldo"
            });
        }
    };
}