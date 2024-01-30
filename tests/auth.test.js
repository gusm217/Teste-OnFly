const AuthService = require('../src/services/AuthService');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Usuario = require('../models/Usuario');

jest.mock('bcrypt', () => {
  return {
    compareSync: jest.fn(() => true)
  };
});

jest.mock('jsonwebtoken', () => {
  return {
    sign: jest.fn(() => 'token')
  };
});

jest.mock('../models/Usuario', () => ({
	findOne: jest.fn()
}));

describe('AuthService', () => {
  describe('login', () => {
		afterEach(() => {
      jest.resetAllMocks();
    });
    it('should return a token for a valid user', async () => {
			const authService = new AuthService();
			Usuario.findOne.mockResolvedValue({
        id: 1,
        email: 'user@example.com',
        senha: 'hashedPassword'
      });

      const email = 'user@example.com';
      const senha = 'password123';

      const token = await authService.login(email, senha);

      expect(token).toEqual('token');
      expect(bcrypt.compareSync).toHaveBeenCalledWith(senha, 'hashedPassword');
      expect(jwt.sign).toHaveBeenCalledWith({ id: 1 }, process.env.JWT_SECRET);
    });

		it('should fail to login with wrong email or password', async () => {
			const authService = new AuthService();
			Usuario.findOne.mockResolvedValue(null);

			const email = 'wrong@example.com';
			const senha = 'wrongPassword';

			await expect(authService.login(email, senha)).rejects.toThrow('Credenciais inválidas');

			expect(bcrypt.compareSync).not.toHaveBeenCalled();
			expect(jwt.sign).not.toHaveBeenCalled();
		});
  });
});
