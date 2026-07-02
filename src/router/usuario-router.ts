import { Router } from "express";
import { UsuarioController } from "../controller/UsuarioController";
import { validate } from "../middleware/validate-middleware";
import { usuarioSchema } from "../schemas/usuario-schema";

const router = Router();
const controller = new UsuarioController();

router.post("/", validate(usuarioSchema), controller.criar);

export default router;