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

4. <br> DB_HOST=[seu_host_do_banco_de_dados]
<br> DB_USERNAME=[seu_usuário_do_banco_de_dados]
<br> DB_PASSWORD=[sua_senha_do_banco_de_dados]
<br> JWT_SECRET=[seu_segredo_jwt]
<br> MEU_EMAIL=[seu_email_para_enviar_emails]
<br> MINHA_SENHA=[sua senha para acessar seu email]

6. npx sequelize db:migrate

7. npm start

### Testes
Para rodar os testes, utilize o comando:

npm test

### Rotas da API
<br> POST /usuarios/register: Registra um novo usuário
<br> POST /login: Autentica um usuário
<br> POST /despesas: Cria uma nova despesa
<br> GET /despesas/:userId: Obtém despesas de um usuário específico
<br> PUT /despesas/:id: Atualiza uma despesa
<br> DELETE /despesas/:id: Deleta uma despesa

<br>
Obrigado!
