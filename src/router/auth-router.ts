import { Router } from "express";
import { UsuarioController } from "../controller/UsuarioController";

const router = Router();
const controller = new UsuarioController();

router.post("/register", controller.registrar);
router.post("/login", controller.login);

export default router;