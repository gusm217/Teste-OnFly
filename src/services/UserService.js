const Usuario = require('../../models/Usuario');
const isValidEmail = require('../helpers/emailValidator')

class UserService {
  async register(nome, email, senha) {
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
