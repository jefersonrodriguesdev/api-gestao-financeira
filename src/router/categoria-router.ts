import { Router } from "express";
import { AppDataSource } from "../data-source";
import { Categoria } from "../entity/Categoria";

const router = Router();

const repo = AppDataSource.getRepository(Categoria);

router.post("/", async (req, res) => {

    try {

        const categoria = repo.create(req.body);

        const nova = await repo.save(categoria);

        return res.status(201).json(nova);

    } catch (err: any) {

        return res.status(500).json({
            error: err.message
        });
    }
});

router.get("/", async (req, res) => {

    try {

        const categorias = await repo.find();

        return res.json(categorias);

    } catch (err: any) {

        return res.status(500).json({
            error: err.message
        });
    }
});

router.delete("/:id", async (req, res) => {

    try {

        const id = Number(req.params.id);

        const categoria = await repo.findOne({
            where: { id }
        });

        if (!categoria) {

            return res.status(404).json({
                error: "Categoria não encontrada"
            });
        }

        await repo.remove(categoria);

        return res.json({
            message:
                "Categoria removida com sucesso"
        });

    } catch (err: any) {

        return res.status(500).json({
            error: err.message
        });
    }
});

export default router;