import { AppDataSource } from "../data-source";
import { Usuario } from "../entity/Usuario";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { AppError } from "../errors/AppError";

export class AuthService {
    private repo = AppDataSource.getRepository(Usuario);

    async login(email: string, senha: string) {
        if (!email || !senha) {
            throw new AppError("Email e senha são obrigatórios", 400);
        }

        const usuario = await this.repo.findOneBy({ email });
        if (!usuario) {
            throw new AppError("Credenciais inválidas", 401);
        }

        const senhaValida = await bcrypt.compare(senha, usuario.senha);
        if (!senhaValida) {
            throw new AppError("Credenciais inválidas", 401);
        }

        const token = jwt.sign(
            { id: usuario.id, email: usuario.email },
            process.env.JWT_SECRET || "CHAVE_SECRETA_SENAC",
            { expiresIn: "1d" }
        );

        return token;
    }
}
