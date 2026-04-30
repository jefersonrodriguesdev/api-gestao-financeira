import { getRepository } from "typeorm";
import { Usuario } from "../entity/Usuario";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export class AuthService {
    private usuarioRepository = getRepository(Usuario);
    async login(email: string, senha: string): Promise<string> {
        const usuario = await this.usuarioRepository.findOne({ where: { email } });
        if (!usuario) {
            throw new Error("Usuário não encontrado");
        }
        const isMatch = bcrypt.compareSync(senha, usuario.senha);
        if (!isMatch) {
            throw new Error("Senha incorreta");
        }
        const token = jwt.sign({ id: usuario.id }, "secreta", { expiresIn: "1h" });
        return token;
    }
}   


