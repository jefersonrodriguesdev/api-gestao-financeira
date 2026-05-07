import { Router } from "express";
import multer from "multer";
import { TransacaoController } from "../controller/TransacaoController";
import { authMiddleware } from "../middleware/auth-middleware";

const upload = multer({ dest: "./my-uploads" });

const router = Router();
const controller = new TransacaoController();

router.use(authMiddleware);

router.post("/", upload.single("comprovante"), controller.inserir);
router.get("/usuario/:usuarioId", controller.listarPorUsuario);
router.get("/saldo/:usuarioId", controller.obterSaldo);

export default router;