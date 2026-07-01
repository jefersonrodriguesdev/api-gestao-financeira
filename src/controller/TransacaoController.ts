import { Response } from "express";
import { TransacaoService } from "../service/TransacaoService";
import { AuthRequest } from "../middleware/auth-middleware";

export class TransacaoController {
    private service = new TransacaoService();

    criar = async (req: AuthRequest, res: Response) => {
        const usuarioId = req.user!.id; 
        const { descricao, valor, categoriaId, tags } = req.body;
        
        const comprovantePath = req.file?.path || null;

        const novaTransacao = await this.service.criar({
            usuarioId,
            descricao,
            valor,
            categoriaId,
            tags,
            comprovantePath
        });

        return res.status(201).json(novaTransacao);
    };

    listar = async (req: AuthRequest, res: Response) => {
        const usuarioId = req.user!.id;
        const transacoes = await this.service.listarPorUsuario(usuarioId);
        return res.json(transacoes);
    };

    deletar = async (req: AuthRequest, res: Response) => {
        const usuarioId = req.user!.id;
        const transacaoId = Number(req.params.id);
        
        await this.service.deletar(transacaoId, usuarioId);
        return res.status(204).send();
    };
}