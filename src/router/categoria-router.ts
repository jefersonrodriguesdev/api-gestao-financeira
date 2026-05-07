import { Router } from "express";
import { AppDataSource } from "../data-source";
import { Categoria } from "../entity/Categoria";

const router = Router();

router.post("/", async (req, res) => {
    const repo = AppDataSource.getRepository(Categoria);
    const nova = await repo.save(req.body);
    res.status(201).json(nova);
});

router.get("/", async (req, res) => {
    const repo = AppDataSource.getRepository(Categoria);
    res.json(await repo.find());
});

export default router;