const request = require('supertest');
const express = require('express');
const bodyParser = require('body-parser');
const ExpensesController = require('../src/api/controllers/ExpensesController');
const ExpensesService = require('../src/services/ExpensesService');
const expensesSchema = require('../src/api/schemas/expensesSchema');

jest.mock('../src/services/ExpensesService', () => {
	return {
    create: jest.fn(),
    read: jest.fn(),
    update: jest.fn(),
    delete: jest.fn()
  };
});
jest.mock('../src/api/schemas/expensesSchema');

const app = express();
app.use(bodyParser.json());

const expensesController = new ExpensesController();
app.post('/expenses', expensesController.create);

describe.only('ExpensesController', () => {
	describe('create', () => {
		it('should create a new expense with valid data', async () => {
			const expenseData = { descricao: 'Compra', valor: 100, data: '2021-01-01', userId: 1 };
			ExpensesService.create.mockResolvedValue(expenseData);
			expensesSchema.validate.mockReturnValue({ value: expenseData, error: null });

			const response = await request(app)
				.post('/expenses')
				.send(expenseData);

			expect(response.statusCode).toBe(201);
			expect(response.body).toEqual(expenseData);
		});
	});

	describe('read', () => {
		it('should return expenses from a specific user', async () => {
			const userId = 1;
			const expensesMock = [
				{ descricao: 'Compra', valor: 100, data: '2021-01-01', userId },
				{ descricao: 'Outra compra', valor: 200, data: '2021-01-02', userId }
			];

			ExpensesService.read.mockResolvedValue(expensesMock);

			const response = await request(app)
				.get(`/expenses/${userId}`);

			expect(response.statusCode).toBe(200);
			expect(response.body).toEqual(expensesMock);
		});
	});

	describe('update', () => {
		it('should update an existing expense', async () => {
			const expenseId = 1;
			const updatedData = { descricao: 'Compra atualizada', valor: 150 };
			const updatedExpense = { ...updatedData, id: expenseId };

			ExpensesService.update.mockResolvedValue(updatedExpense);
			expensesSchema.validate.mockReturnValue({ value: updatedData, error: null });

			const response = await request(app)
				.put(`/expenses/${expenseId}`)
				.send(updatedData);

			expect(response.statusCode).toBe(200);
			expect(response.body).toEqual(updatedExpense);
		});
	});

	describe('delete', () => {
		it('should delete an existing expense', async () => {
			const expenseId = 1;

			ExpensesService.delete.mockResolvedValue();

			const response = await request(app)
				.delete(`/expenses/${expenseId}`);

			expect(response.statusCode).toBe(204);
			expect(response.body).toEqual({});
		});
	});
});
