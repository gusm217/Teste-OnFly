const AuthService = require('../../services/AuthService');
const authService = new AuthService();

class AuthController {
  async login(req, res) {
    try {
      const { email, senha } = req.body;
      const token = await authService.login(email, senha);
      res.status(200).json({ token });
    } catch (error) {
      res.status(401).json({ error: error.message });
    }
  }
}

module.exports = AuthController;
