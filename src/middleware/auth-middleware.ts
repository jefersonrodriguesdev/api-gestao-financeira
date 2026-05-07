import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

// Esta interface estende o Request do Express para aceitar o campo user tipado
export interface AuthRequest extends Request {
    user?: {
        id: number;
        email: string;
    };
}

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization?.split(' ')[1];
    
    if (!token) {
        return res.status(401).json({ msg: "Acesso negado. Token não fornecido." });
    }

    try {
        const decoded = jwt.verify(token, "CHAVE_SECRETA_SENAC") as { id: number, email: string };
        (req as any).user = decoded;
        next();
    } catch (err) {
        res.status(401).json({ msg: "Token inválido ou expirado" });
    }
};