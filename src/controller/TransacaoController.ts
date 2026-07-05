import { Response } from "express";
import { TransacaoService } from "../service/TransacaoService";
import { AuthRequest } from "../middleware/auth-middleware";

export class TransacaoController {
    private service = new TransacaoService();

    criar = async (req: AuthRequest, res: Response) => {
        const usuarioId = req.user!.id; 
        
        const descricao = req.body.descricao;
        const valor = Number(req.body.valor);
        const categoriaId = Number(req.body.categoriaId);
        
        let tagsFormatadas = [];
        if (req.body.tags) {
            const tagsArray = JSON.parse(req.body.tags);
            tagsFormatadas = tagsArray.map((id: number) => ({ id }));
        }
        
        const comprovantePath = req.file ? req.file.filename : null;

        const novaTransacao = await this.service.criar({
            usuarioId,
            descricao,
            valor,
            categoriaId,
            tags: tagsFormatadas,
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