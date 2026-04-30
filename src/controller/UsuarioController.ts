import { Request, Response } from "express";
import { UsuarioService } from "../service/UsuarioService";

export class UsuarioController {
    private service = new UsuarioService();

    registrar = async (req: Request, res: Response) => {
        try {
            const novo = await this.service.registrar(req.body);
            res.status(201).json({ id: novo.id, nome: novo.nome, email: novo.email });
        } catch (err: any) {
            res.status(err.id || 500).json({ error: err.msg });
        }
    }

    login = async (req: Request, res: Response) => {
        try {
            const { email, senha } = req.body;
            const token = await this.service.login(email, senha);
            res.json({ auth: true, token });
        } catch (err: any) {
            res.status(err.id || 500).json({ error: err.msg });
        }
    }
}