const Despesa = require('../../models/Despesa');
const Usuario = require('../../models/Usuario');
const sendEmail = require('../../utils/mailer');

class ExpensesService {
  async create(data) {
		const newExpense = await Despesa.create(data);

		const user = await Usuario.findOne({ where: { id: newExpense.userId } });
    if (user) {
      await sendEmail({
        from: process.env.MEU_EMAIL,
        to: user.email,
        subject: 'Despesa Cadastrada',
        text: `Uma nova despesa foi cadastrada: ${data.descricao}`
      });
    }

		return newExpense;
	}

	async read(userId) {
		const expenses = await Despesa.findAll({ where: { userId } });

    if (!expenses.length) {
      throw new Error('Nenhuma despesa encontrada');
    }

    return expenses;
	}

	async update(id, dadosAtualizados) {
    const expense = await Despesa.findByPk(id);

    if (!expense) {
      throw new Error('Despesa não encontrada');
    }

    await Despesa.update(dadosAtualizados, { where: { id } });

    const updatedExpense = await Despesa.findByPk(id);
    return updatedExpense;
  }

	async delete(id) {
		const expense = await Despesa.findByPk(id);

		if(!expense) {
			throw new Error('Despesa não encontrada');
		}

		await Despesa.destroy({ where: { id }});
	}
}

module.exports = ExpensesService;
