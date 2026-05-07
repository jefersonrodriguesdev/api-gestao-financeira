import { Router } from "express";
import multer from "multer";
import path from "path";
import { TransacaoController } from "../controller/TransacaoController";
import { authMiddleware } from "../middleware/auth-middleware";

// Configuração para manter extensão original e nome único
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "./my-uploads");
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
    }
});

const upload = multer({ storage });
const router = Router();
const controller = new TransacaoController();

router.use(authMiddleware);

router.post("/", upload.single("comprovante"), controller.inserir);
router.get("/meu-extrato", controller.listarLogado); // Alterado para segurança
router.get("/meu-saldo", controller.obterSaldoLogado); // Alterado para 
router.delete("/:id", controller.deletar);// deleta as transações, mas só as do usuário logado

export default router;