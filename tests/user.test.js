const Usuario = require('../models/Usuario');
const UserService = require('../src/services/UserService');

jest.mock('../models/Usuario', () => ({
	findOne: jest.fn(),
	create: jest.fn().mockResolvedValue({
    id: 1,
    nome: 'John Doe',
    email: 'johndoe@example.com',
  }),
}));

describe('UserService', () => {
  describe('register', () => {

		afterEach(() => {
      jest.resetAllMocks();
    });
    it('should create a new user with valid data', async () => {
			const userService = new UserService();
			const user = {
				nome: 'John Doe',
				email: 'johndoe@example.com',
				senha: '12345678',
			};

  		const newUser = await userService.register(user.nome, user.email, user.senha);

  		expect(Usuario.create).toHaveBeenCalledWith(user.nome, user.email, user.senha);
			expect(newUser).toHaveProperty('id');
  		expect(newUser).toHaveProperty('nome', user.nome);
  		expect(newUser).toHaveProperty('email', user.email);
    });

		it('should fail with an existing email', async () => {
			const userService = new UserService();
			Usuario.findOne.mockImplementationOnce(() => Promise.resolve({
				nome: 'Algum Nome',
				email: 'alreadyUsed@example.com',
			}));

			const nome = 'Algum Nome';
			const email = 'alreadyUsed@example.com';
			const senha = 'anotherPassword';

			await expect(userService.register(nome, email, senha)).rejects.toThrow('Usuário já existe');
		});

		it('should throw an error when email is invalid', async () => {
			const userService = new UserService();
			const user = {
				nome: 'John Doe',
				email: 'invalid-email',
				senha: '12345678',
			};

			await expect(userService.register(user.nome, user.email, user.senha)).rejects.toThrow('Email inválido!');
		});

		it('should throw an error when name is empty', async () => {
			const userService = new UserService();
			const user = {
				nome: '',
				email: 'johndoe@example.com',
				senha: '12345678',
			};

			await expect(userService.register(user.nome, user.email, user.senha)).rejects.toThrow('Nome é obrigatório!');
		});
  });
});
