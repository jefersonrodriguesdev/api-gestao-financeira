import { Router } from "express";
import { AuthController } from "../controller/auth-controller";

export const usuarioRouter = Router();
const authController = new AuthController();    

usuarioRouter.post("/auth/login", (req, res) => authController.login(req, res));

