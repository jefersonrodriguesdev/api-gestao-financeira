import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export interface AuthRequest extends Request {
    user?: {
        id: number;
        email: string;
    };
}

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
    if (req.method === "OPTIONS") {
        return next();
    }

    const token = req.headers.authorization?.split(' ')[1];
    
    if (!token) {
        return res.status(401).json({ msg: "Acesso negado. Token não fornecido." });
    }

    try {
        const decoded = jwt.verify(
            token, 
            process.env.JWT_SECRET || "CHAVE_SECRETA_SENAC"
        ) as { id: number, email: string };
        (req as any).user = decoded;
        next();
    } catch (err) {
        res.status(401).json({ msg: "Token inválido ou expirado" });
    }
};