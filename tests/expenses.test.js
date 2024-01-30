const DespesasService = require('../src/services/DespesasService');
const Despesa = require('../models/Despesa');
const sendEmail = require('../utils/mailer');

jest.mock('../models/Despesa', () => ({
	create: jest.fn().mockResolvedValue({
    id: 1,
    descricao: 'Compra de material',
		data: '2021-01-01',
		userId: 1,
		valor: 100,
  }),
	findAll: jest.fn(),
	update: jest.fn(),
	findByPk: jest.fn(),
	destroy: jest.fn()
}));

jest.mock('nodemailer', () => ({
  createTransport: jest.fn().mockReturnValue({
    sendMail: jest.fn().mockResolvedValue(true),
  }),
}));

describe('DespesasService', () => {
  let despesasService;
  beforeEach(() => {
    despesasService = new DespesasService();
  });

  describe('create', () => {
    it('should create a new expense with valid data', async () => {
      const despesaData = { descricao: 'Compra de material',data: '2021-01-01',  valor: 100, userId: 1};
      Despesa.create.mockResolvedValue(despesaData);

      const novaDespesa = await despesasService.create(despesaData);

      expect(Despesa.create).toHaveBeenCalledWith(despesaData);
      expect(novaDespesa).toEqual(despesaData);
    });

		it('should verify if email is sent to user when new expense is created', async () => {
      const emailData = {
				from: 'remetente@example.com',
				to: 'destinatario@example.com',
				subject: 'Assunto do E-mail',
				text: 'Corpo do e-mail',
			};

			await sendEmail(emailData);

			const nodemailer = require('nodemailer');

			expect(nodemailer.createTransport().sendMail).toHaveBeenCalledWith(emailData);
    });
  });
	describe('read', () => {
		it('should return all expenses from requested user', async () => {
			const userId = 1;
      const despesasEsperadas = [
        { id: 1, descricao: 'Compra de material', valor: 100, userId },
        { id: 2, descricao: 'Compra de equipamentos', valor: 200, userId }
      ];

      Despesa.findAll.mockResolvedValue(despesasEsperadas);

      const despesas = await despesasService.read(userId);

      expect(Despesa.findAll).toHaveBeenCalledWith({ where: { userId } });
      expect(despesas).toEqual(despesasEsperadas);
    });

		it('should return empty array when theres no expenses from requested user', async () => {
      const userId = 1;

      Despesa.findAll.mockResolvedValue([]);

      await expect(despesasService.read(userId)).rejects.toThrow('Nenhuma despesa encontrada');
    });
	})

	describe('update', () => {
		it('should update an existing expense successfuly', async () => {
			const expenseId = 1;
      const newData = { descricao: 'Nova descrição', valor: 150 };
      const originalData = { id: expenseId, descricao: 'Descrição antiga', valor: 100 };
      const updatedData = { id: expenseId, ...newData };

      Despesa.findByPk.mockResolvedValueOnce(originalData);
      Despesa.update.mockResolvedValue([1]);
      Despesa.findByPk.mockResolvedValueOnce(updatedData);

      const resultado = await despesasService.update(expenseId, newData);

      expect(Despesa.update).toHaveBeenCalledWith(newData, { where: { id: expenseId } });
      expect(resultado).toEqual(updatedData);
		})

		it('should fail if no expense is found', async () => {
			const expenseId = 999;
			const updatedData = { descricao: 'Nova descrição', valor: 150 };

			Despesa.findByPk.mockResolvedValue(null);

			await expect(despesasService.update(expenseId, updatedData)).rejects.toThrow('Despesa não encontrada');
		});
	});

	describe('deliete', () => {
		it('should delete an existing expense', async () => {
			const expenseId = 1;
      Despesa.findByPk.mockResolvedValue({ id: expenseId, descricao: 'Compra de material', valor: 100 });
      Despesa.destroy.mockResolvedValue(1);

      await despesasService.delete(expenseId);

      expect(Despesa.destroy).toHaveBeenCalledWith({ where: { id: expenseId } });
		})

		it('should fail when try to delete a non existing expense', async () => {
			const expenseId = 999;
			Despesa.findByPk.mockResolvedValue(null);

			await expect(despesasService.delete(expenseId)).rejects.toThrow('Despesa não encontrada');
		});
	})
})
