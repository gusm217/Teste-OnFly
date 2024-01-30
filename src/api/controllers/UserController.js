const UserService = require('../../services/UserService');
const userService = new UserService();
const userSchema = require('../schemas/userSchema');

class UserController {
  async register(req, res) {
    try {
      const { value, error } = userSchema.validate(req.body);
      if (error) {
        throw new Error(error.details[0].message);
      }

      const { nome, email, senha } = value;
      const user = await userService.register(nome, email, senha);

      res.status(201).json(user);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
	}
}

module.exports = UserController;
