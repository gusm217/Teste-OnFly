const request = require('supertest');
const express = require('express');
const bodyParser = require('body-parser');
const DespesasController = require('../src/api/controllers/DespesasController');
const DespesasService = require('../src/services/DespesasService');
const despesasSchema = require('../src/api/schemas/despesasSchema');

jest.mock('../src/services/DespesasService', () => {
	return {
    create: jest.fn(),
    read: jest.fn(),
    update: jest.fn(),
    delete: jest.fn()
  };
});
jest.mock('../src/api/schemas/despesasSchema');

const app = express();
app.use(bodyParser.json());

const despesasController = new DespesasController();
app.post('/despesas', despesasController.create);

describe.only('DespesasController', () => {
	describe('create', () => {
		it('should create a new expense with valid data', async () => {
			const despesaData = { descricao: 'Compra', valor: 100, data: '2021-01-01', userId: 1 };
			DespesasService.create.mockResolvedValue(despesaData);
			despesasSchema.validate.mockReturnValue({ value: despesaData, error: null });

			const response = await request(app)
				.post('/despesas')
				.send(despesaData);

			expect(response.statusCode).toBe(201);
			expect(response.body).toEqual(despesaData);
		});
	});

	describe('read', () => {
		it('should return expenses from a specific user', async () => {
			const userId = 1;
			const despesasMock = [
				{ descricao: 'Compra', valor: 100, data: '2021-01-01', userId },
				{ descricao: 'Outra compra', valor: 200, data: '2021-01-02', userId }
			];

			DespesasService.read.mockResolvedValue(despesasMock);

			const response = await request(app)
				.get(`/despesas/${userId}`);

			expect(response.statusCode).toBe(200);
			expect(response.body).toEqual(despesasMock);
		});
	});

	describe('update', () => {
		it('should update an existing expense', async () => {
			const despesaId = 1;
			const dadosAtualizados = { descricao: 'Compra atualizada', valor: 150 };
			const despesaAtualizada = { ...dadosAtualizados, id: despesaId };

			DespesasService.update.mockResolvedValue(despesaAtualizada);
			despesasSchema.validate.mockReturnValue({ value: dadosAtualizados, error: null });

			const response = await request(app)
				.put(`/despesas/${despesaId}`)
				.send(dadosAtualizados);

			expect(response.statusCode).toBe(200);
			expect(response.body).toEqual(despesaAtualizada);
		});
	});

	describe('delete', () => {
		it('should delete an existing expense', async () => {
			const despesaId = 1;

			DespesasService.delete.mockResolvedValue();

			const response = await request(app)
				.delete(`/despesas/${despesaId}`);

			expect(response.statusCode).toBe(204);
			expect(response.body).toEqual({});
		});
	});
});
