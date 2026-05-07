import { Request, Response } from "express";
import { TransacaoService } from "../service/TransacaoService";

export class TransacaoController {
    private service = new TransacaoService();

    inserir = async (req: Request, res: Response) => {
        try {
            const dados = req.body;
            // Segurança: Vincula automaticamente ao ID do usuário que está no Token
            dados.usuario = (req as any).user.id; 

            if (req.file) {
                dados.comprovantePath = req.file.path;
            }

            const nova = await this.service.lancar(dados);
            return res.status(201).json(nova);
        } catch (err: any) {
            return res.status(err.id || 500).json({ error: err.msg || "Erro ao lançar transação" });
        }
    };

    // NOME CORRIGIDO: listarLogado
    listarLogado = async (req: Request, res: Response) => {
        try {
            const usuarioId = (req as any).user.id; 
            const transacoes = await this.service.listarPorUsuario(usuarioId);
            return res.json(transacoes);
        } catch (err: any) {
            return res.status(500).json({ error: "Erro ao listar transações" });
        }
    };

    // NOME CORRIGIDO: obterSaldoLogado
    obterSaldoLogado = async (req: Request, res: Response) => {
        try {
            const usuarioId = (req as any).user.id; 
            const saldo = await this.service.calcularSaldo(usuarioId);
            return res.json(saldo);
        } catch (err: any) {
            return res.status(500).json({ error: "Erro ao calcular saldo" });
        }
    };
}