// src/middleware/auth-middleware.ts
import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) return res.status(401).json({ msg: "Acesso negado" });

    try {
        const decoded = jwt.verify(token, "SECRET_KEY_SENAC"); // Use uma env futuramente
        (req as any).user = decoded;
        next();
    } catch (err) {
        res.status(401).json({ msg: "Token inválido" });
    }
};