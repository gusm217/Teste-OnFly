const express = require('express');
const DespesasController = require('../controllers/DespesasController');
const despesasController = new DespesasController();

const router = express.Router();

router.post('/', despesasController.create);

router.get('/:userId', despesasController.read);

router.put('/:id', despesasController.update);

router.delete('/:id', despesasController.delete);

module.exports = router;
