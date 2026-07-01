import { Request, Response } from "express";
import { AuthService } from "../service/AuthService";

export class AuthController {
    private service = new AuthService();

    login = async (req: Request, res: Response) => {
        const { email, senha } = req.body;
        const token = await this.service.login(email, senha);
        return res.json({ token });
    };
}