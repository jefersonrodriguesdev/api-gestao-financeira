import { AppDataSource } from "../data-source";
import { Usuario } from "../entity/Usuario";
import { AppError } from "../errors/AppError";
import bcrypt from "bcryptjs";

export class UsuarioService {
    private repo = AppDataSource.getRepository(Usuario);

    async criar(nome: string, email: string, senha: string) {
        const existe = await this.repo.findOneBy({ email });
        if (existe) {
            throw new AppError("Email já cadastrado", 400);
        }

        const senhaHash = await bcrypt.hash(senha, 8);
        const usuario = this.repo.create({ nome, email, senha: senhaHash });
        await this.repo.save(usuario);

        // Retorna o usuário sem a senha para segurança
        const { senha: _, ...usuarioSemSenha } = usuario;
        return usuarioSemSenha;
    }

    async listar() {
        const usuarios = await this.repo.find();
        
        // Mapeia a lista para remover a senha de todos os usuários por segurança
        return usuarios.map(({ senha, ...usuarioSemSenha }) => usuarioSemSenha);
    }
}