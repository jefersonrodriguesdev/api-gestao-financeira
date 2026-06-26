import { Router } from "express";
import { TagController } from "../controller/TagController";
import { authMiddleware } from "../middleware/auth-middleware";

const router = Router();
const controller = new TagController();

router.use(authMiddleware); // Protege as rotas de tags

router.post("/", controller.criar);
router.get("/", controller.listar);

export default router;