const Usuario = require('../../models/Usuario');

class UserService {
  async register(nome, email, senha) {
		const regexEmail = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
		const isValidEmail = (email) => regexEmail.test(email);

		if(!nome) {
			throw new Error('Nome é obrigatório!')
		}

		if (!isValidEmail(email)) {
			throw new Error('Email inválido!');
		}

		const usersExists = await Usuario.findOne({ where: { email } });
		if (usersExists) {
			throw new Error('Usuário já existe!');
		}

		return await Usuario.create(nome, email, senha);
  }
}

module.exports = UserService;
