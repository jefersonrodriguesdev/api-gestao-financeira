import { Router } from "express";
import { TagController } from "../controller/TagController";
import { authMiddleware } from "../middleware/auth-middleware";
import { validate } from "../middleware/validate-middleware";
import { tagSchema } from "../schemas/tag-schema";

const router = Router();
const controller = new TagController();

router.use(authMiddleware);

router.post("/seed", controller.seed);
router.post("/", validate(tagSchema), controller.criar);
router.get("/", controller.listar);

export default router;