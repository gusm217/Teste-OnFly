const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const Usuario = require('../../models/Usuario');

class AuthService {
  async login(email, senha) {
    const usuario = await Usuario.findOne({ where: { email } });

    if (!usuario || !bcrypt.compareSync(senha, usuario.senha)) {
      throw new Error('Credenciais inválidas');
    }

    const token = jwt.sign({ id: usuario.id }, process.env.JWT_SECRET);

    return token;
  }
}

module.exports = AuthService;
