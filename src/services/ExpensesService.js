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
		const despesas = await Despesa.findAll({ where: { userId } });

    if (!despesas.length) {
      throw new Error('Nenhuma despesa encontrada');
    }

    return despesas;
	}

	async update(id, dadosAtualizados) {
    const despesa = await Despesa.findByPk(id);

    if (!despesa) {
      throw new Error('Despesa não encontrada');
    }

    await Despesa.update(dadosAtualizados, { where: { id } });

    const despesaAtualizada = await Despesa.findByPk(id);
    return despesaAtualizada;
  }

	async delete(id) {
		const despesa = await Despesa.findByPk(id);

		if(!despesa) {
			throw new Error('Despesa não encontrada');
		}

		await Despesa.destroy({ where: { id }});
	}
}

module.exports = ExpensesService;
