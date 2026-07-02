import { Request, Response, NextFunction } from "express";
import { AppError } from "../errors/AppError";
import { ZodError, z } from "zod";

export const errorMiddleware = (
    err: Error,
    req: Request,
    res: Response,
    next: NextFunction
) => {
    if (err instanceof AppError) {
        return res.status(err.statusCode).json({
            status: "error",
            message: err.message,
        });
    }

    if (err instanceof ZodError) {
        return res.status(400).json({
            status: "validation_error",
            errors: err.issues.map((e: ZodIssue) => ({
                campo: e.path.join("."),
                mensagem: e.message,
            })),
        });
    }

    console.error(err);
    return res.status(500).json({
        status: "error",
        message: "Internal server error",
    });
};