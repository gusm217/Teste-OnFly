const ExpensesService = require('../../services/ExpensesService');
const expensesService = new ExpensesService();
const expensesSchema = require('../schemas/expensesSchema');

class ExpensesController {
  async create(req, res) {
    try {
      const { value, error } = expensesSchema.validate(req.body);
      if (error) {
        throw new Error(error.details[0].message);
      }

      const expense = await expensesService.create(value);
      res.status(201).json(expense);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

	async read(req, res) {
    try {
      const userId = req.params.userId;
      const expenses = await expensesService.read(userId);
      res.json(expenses);
    } catch (error) {
      res.status(404).json({ error: error.message });
    }
  }

  async update(req, res) {
    try {
			const { value, error } = expensesSchema.validate(req.body);
      if (error) {
        throw new Error(error.details[0].message);
      }

      const expenseId = req.params.id;
      const newData = value;
      const updatedData = await expensesService.update(expenseId, newData);
      res.json(updatedData);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  async delete(req, res) {
    try {
      const expenseId = req.params.id;
      await expensesService.delete(expenseId);
      res.status(204).send();
    } catch (error) {
      res.status(404).json({ error: error.message });
    }
  }
}

module.exports = ExpensesController;
