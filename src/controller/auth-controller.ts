import { Request, Response } from "express";
import { AuthService } from "../service/AuthService";

export class AuthController {   
    private authService = new AuthService();
    async login(req: Request, res: Response) {
        const { email, senha } = req.body;
        try {
            const token = await this.authService.login(email, senha);
            res.json({ token });
        } catch (error) {
            res.status(401).json({ msg: (error as Error).message });
        }
    }
}   

