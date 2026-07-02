# API de Gestão Financeira Personalizada

Uma API REST robusta e estruturada para controle de finanças pessoais, desenvolvida em Node.js com TypeScript. O projeto conta com validação de dados rigorosa, tratamento global de exceções, autenticação JWT, upload de comprovantes e cobertura de testes unitários.

🚀 **Link da API em Produção:** [https://api-gestao-financeira-7p7d.onrender.com]

---

## 🛠️ Tecnologias Utilizadas

- **Ambiente de Execução:** Node.js v24
- **Linguagem:** TypeScript
- **Framework Web:** Express 5 (com suporte nativo a erros assíncronos)
- **Mapeamento Objeto-Relacional (ORM):** TypeORM
- **Banco de Dados:** PostgreSQL
- **Validação de Dados:** Zod
- **Autenticação:** JSON Web Token (JWT) e BcryptJS
- **Upload de Arquivos:** Multer
- **Testes Unitários:** Jest

---

## 📐 Arquitetura do Projeto

A aplicação foi desenhada seguindo os princípios de separação de conceitos (Separation of Concerns), garantindo alta manutenibilidade e testabilidade:

- **Entities:** Modelagem das tabelas do banco de dados (Usuário, Transação, Categoria, Tag).
- **Repositories:** Camada de abstração de dados gerenciada pelo TypeORM.
- **Services:** Concentração de 100% das regras de negócio e lançamentos de exceções customizadas (`AppError`).
- **Controllers:** Intermediação entre as requisições HTTP e as regras de negócio, sem acoplamento com o banco.
- **Middlewares:** Camada de interceptação global para validação de esquemas (`Zod`), autenticação (`JWT`) e tratamento centralizado de erros.

---

## 🔐 Variáveis de Ambiente

O projeto utiliza o arquivo `.env` para gerenciar credenciais em ambiente local. Em produção, as variáveis são injetadas diretamente pelo servidor:

```env
PORT=3000
DATABASE_URL=postgres://usuario:senha@host:port/database
JWT_SECRET=sua_chave_secreta_aqui