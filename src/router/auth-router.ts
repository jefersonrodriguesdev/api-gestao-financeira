import { Router } from "express";
import { AuthController } from "../controller/auth-controller";
import { validate } from "../middleware/validate-middleware";
import { authSchema } from "../schemas/auth-schema";

const router = Router();
const controller = new AuthController();

router.post("/login", validate(authSchema), controller.login);

export default router;