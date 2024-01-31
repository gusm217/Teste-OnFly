const express = require('express');
const ExpensesController = require('../controllers/ExpensesController');
const expensesController = new ExpensesController();

const router = express.Router();

router.post('/', expensesController.create);

router.get('/:userId', expensesController.read);

router.put('/:id', expensesController.update);

router.delete('/:id', expensesController.delete);

module.exports = router;
