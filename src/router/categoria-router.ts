import { Router } from "express";
import { CategoriaController } from "../controller/CategoriaController";
import { validate } from "../middleware/validate-middleware";
import { categoriaSchema } from "../schemas/categoria-schema";
import { authMiddleware } from "../middleware/auth-middleware";

const router = Router();
const controller = new CategoriaController();

router.use(authMiddleware);

router.post("/", validate(categoriaSchema), controller.criar);
router.get("/", controller.listar);

export default router;