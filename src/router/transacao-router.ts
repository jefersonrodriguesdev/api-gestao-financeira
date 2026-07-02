import { Router } from "express";
import { TransacaoController } from "../controller/TransacaoController";
import { authMiddleware } from "../middleware/auth-middleware";
import { validate } from "../middleware/validate-middleware";
import { transacaoSchema } from "../schemas/transacao-schema";

import multer from "multer";
import path from "path";

const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, "uploads/"),
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
        cb(null, file.fieldname + "-" + uniqueSuffix + path.extname(file.originalname));
    }
});
const upload = multer({ storage });

const router = Router();
const controller = new TransacaoController();

router.use(authMiddleware);

router.post("/", upload.single("comprovante"), validate(transacaoSchema), controller.criar);
router.get("/", controller.listar);
router.delete("/:id", controller.deletar);

export default router;