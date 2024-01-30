const DespesasService = require('../../services/DespesasService');
const despesasSchema = require('../schemas/despesasSchema');

class DespesasController {
  async create(req, res) {
    try {
      const { value, error } = despesasSchema.validate(req.body);
      if (error) {
        throw new Error(error.details[0].message);
      }

      const despesa = await DespesasService.create(value);
      res.status(201).json(despesa);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

	async read(req, res) {
    try {
      const userId = req.params.userId;
      const despesas = await DespesasService.read(userId);
      res.json(despesas);
    } catch (error) {
      res.status(404).json({ error: error.message });
    }
  }

  async update(req, res) {
    try {
			const { value, error } = despesasSchema.validate(req.body);
      if (error) {
        throw new Error(error.details[0].message);
      }

      const despesaId = req.params.id;
      const dadosAtualizados = value;
      const despesaAtualizada = await DespesasService.update(despesaId, dadosAtualizados);
      res.json(despesaAtualizada);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  async delete(req, res) {
    try {
      const despesaId = req.params.id;
      await DespesasService.delete(despesaId);
      res.status(204).send();
    } catch (error) {
      res.status(404).json({ error: error.message });
    }
  }
}

module.exports = DespesasController;
