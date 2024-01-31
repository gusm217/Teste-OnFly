const request = require('supertest');
const express = require('express');
const bodyParser = require('body-parser');
const UserController = require('../src/api/controllers/UserController');
const UserService = require('../src/services/UserService');
const userSchema = require('../src/api/schemas/userSchema');

jest.mock('../src/services/UserService', () => {

});
jest.mock('../src/api/schemas/userSchema');

const app = express();
app.use(bodyParser.json());

const userController = new UserController();
app.post('/register', userController.register);

describe('UserController', () => {
	describe('register', () => {
		it('deve registrar um novo usuário com dados válidos', async () => {
			const userData = { nome: 'John Doe', email: 'john@example.com', senha: 'senha123' };
			const userMock = { ...userData, id: 1 };

			UserService.register.mockResolvedValue(userMock);
			userSchema.validate.mockReturnValue({ value: userData, error: null });

			const response = await request(app)
				.post('/register')
				.send(userData);

			expect(response.statusCode).toBe(201);
			expect(response.body).toEqual(userMock);
		});

		it('deve retornar 400 para dados inválidos', async () => {
			const userData = { nome: '', email: 'john@example.com', senha: 'senha123' };
			const validationError = { details: [{ message: 'Nome é obrigatório' }] };

			userSchema.validate.mockReturnValue({ value: userData, error: validationError });

			const response = await request(app)
				.post('/register')
				.send(userData);

			expect(response.statusCode).toBe(400);
			expect(response.body).toHaveProperty('error', 'Nome é obrigatório');
		});
	});
});
