const express = require('express');
const UserController = require('../controllers/UserController');
const userController = new UserController();

const router = express.Router();

router.post('/register', userController.register);

module.exports = router;
