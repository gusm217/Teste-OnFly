const express = require('express');
const AuthController = require('../controllers/AuthController');
const authController = new AuthController();

const router = express.Router();

router.post('/', authController.login);

module.exports = router;
