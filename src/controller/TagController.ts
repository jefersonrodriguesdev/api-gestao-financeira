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

    seed = async (req: Request, res: Response) => {
        try {
            const etiquetasIniciais = [
                "Fixa",
                "Lazer",
                "Urgente",
                "Estudos",
                "Investimento"
            ];

            const criadas = [];

            for (const nome of etiquetasIniciais) {
                try {
                    const novaTag = await this.service.criar(nome);
                    criadas.push(novaTag);
                } catch (err) {
                    continue;
                }
            }

            return res.status(201).json({ 
                message: "Seed de etiquetas realizado com sucesso!", 
                tags: criadas 
            });
        } catch (error: any) {
            return res.status(500).json({ message: "Erro ao executar o seed: " + error.message });
        }
    };
}