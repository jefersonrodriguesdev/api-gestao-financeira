import { Request, Response } from "express";
import { CategoriaService } from "../service/CategoriaService"; 

export class CategoriaController {
    private service = new CategoriaService();

    criar = async (req: Request, res: Response) => {
        const { nome, tipo } = req.body;
        const novaCategoria = await this.service.criar(nome, tipo);
        return res.status(201).json(novaCategoria);
    };

    listar = async (req: Request, res: Response) => {
        const categorias = await this.service.listar();
        return res.json(categorias);
    };
}