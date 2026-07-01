import { Request, Response } from "express";
import { UsuarioService } from "../service/UsuarioService";

export class UsuarioController {
    private service = new UsuarioService();

    criar = async (req: Request, res: Response) => {
        const { nome, email, senha } = req.body;
        const novoUsuario = await this.service.criar(nome, email, senha);
        return res.status(201).json(novoUsuario);
    };

    listar = async (req: Request, res: Response) => {
        const usuarios = await this.service.listar();
        return res.json(usuarios);
    };
}