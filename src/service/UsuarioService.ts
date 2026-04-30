import { Repository } from "typeorm";
import { Usuario } from "../entity/Usuario";
import { AppDataSource } from "../data-source";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export class UsuarioService {
    private repo: Repository<Usuario> = AppDataSource.getRepository(Usuario);

    async registrar(dados: Partial<Usuario>): Promise<Usuario> {
        if (!dados.email || !dados.senha) throw { id: 400, msg: "Email e senha obrigatórios" };
        
        // Verifica se usuário já existe
        const existe = await this.repo.findOneBy({ email: dados.email });
        if (existe) throw { id: 400, msg: "E-mail já cadastrado" };

        // Criptografia (Conceito B/A)
        const salt = bcrypt.genSaltSync(10);
        dados.senha = bcrypt.hashSync(dados.senha, salt);

        return await this.repo.save(dados as Usuario);
    }

    async login(email: string, senha_plana: string): Promise<string> {
        const usuario = await this.repo.findOneBy({ email });
        if (!usuario) throw { id: 401, msg: "Credenciais inválidas" };

        const senhaValida = bcrypt.compareSync(senha_plana, usuario.senha);
        if (!senhaValida) throw { id: 401, msg: "Credenciais inválidas" };

        // Gera Token JWT (Conceito B)
        return jwt.sign({ id: usuario.id }, "CHAVE_SECRETA_SENAC", { expiresIn: '1d' });
    }
}