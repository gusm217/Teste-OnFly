const request = require('supertest');
const express = require('express');
const bodyParser = require('body-parser');
const AuthController = require('../src/api/controllers/AuthController');

jest.mock('../src/services/AuthService', () => {
  return {
  	login: jest.fn()
	};
});

const app = express();
app.use(bodyParser.json());

const authController = new AuthController();
app.post('/login', authController.login);

describe('AuthController', () => {
  it('should return a token for valid credentials', async () => {
    const userData = { email: 'user@example.com', senha: 'senha123' };

    const response = await request(app)
      .post('/login')
      .send(userData);

    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('token');
  });
});
