# Projeto de Gerenciamento de Despesas

Este projeto é uma aplicação backend construída com Node.js e Express. Ele permite aos usuários registrar, ler, atualizar e deletar despesas. Além disso, oferece funcionalidades de registro de usuários e autenticação.

## Funcionalidades

- CRUD de despesas
- Registro de usuários
- Autenticação de usuários
- Envio de e-mails em determinadas operações

## Tecnologias Utilizadas

- Node.js
- Express
- Sequelize (ORM)
- PostgreSQL
- Joi (Validação)
- bcrypt (Hash de senhas)
- JSON Web Tokens (JWT)
- Nodemailer (Envio de e-mails)
- Jest (Testes)
- Supertest (Testes de API)

## Configuração e Instalação

Antes de rodar o projeto, é necessário configurar algumas variáveis de ambiente e o banco de dados.

### Pré-requisitos

- Node.js
- PostgreSQL

### Instalação

1. Clone o repositório:
   ```bash
   git clone [url-do-repositório]

2. cd [nome-do-projeto]
   
3. npm install

4. 
DB_HOST=[seu_host_do_banco_de_dados]
DB_USER=[seu_usuário_do_banco_de_dados]
DB_PASS=[sua_senha_do_banco_de_dados]
JWT_SECRET=[seu_segredo_jwt]
MEU_EMAIL=[seu_email_para_enviar_emails]

5. npx sequelize db:migrate

6. npm start

Testes
Para rodar os testes, utilize o comando:

npm test

Rotas da API
POST /usuarios/register: Registra um novo usuário
POST /login: Autentica um usuário
POST /despesas: Cria uma nova despesa
GET /despesas/:userId: Obtém despesas de um usuário específico
PUT /despesas/:id: Atualiza uma despesa
DELETE /despesas/:id: Deleta uma despesa

Obrigado!
