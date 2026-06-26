import { Request, Response } from "express";
import { TagService } from "../service/TagService";

export class TagController {
    private service = new TagService();

    criar = async (req: Request, res: Response) => {
        try {
            const { nome } = req.body;
            const novaTag = await this.service.criar(nome);
            return res.status(201).json(novaTag);
        } catch (err: any) {
            return res.status(err.id || 500).json({ error: err.msg || "Erro interno" });
        }
    };

    listar = async (req: Request, res: Response) => {
        try {
            const tags = await this.service.listarTodas();
            return res.json(tags);
        } catch (err: any) {
            return res.status(500).json({ error: "Erro ao listar tags" });
        }
    };
}