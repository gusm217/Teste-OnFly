const Joi = require('joi');

const userSchema = Joi.object({
	nome: Joi.string().required(),
	email: Joi.string().required(),
	senha: Joi.string().required()
});

module.exports = userSchema;
