const Joi = require('joi');

const expensesSchema = Joi.object({
  descricao: Joi.string().min(1).max(191).required(),
  valor: Joi.number().positive().required(),
  data: Joi.date().max('now').message({
		'date.max': 'A data não pode ser uma data futura.'
	}).required(),
});

module.exports = expensesSchema;
