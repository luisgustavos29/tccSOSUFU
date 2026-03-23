const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// Rota para a tela de "Criar Conta"
router.post('/cadastro', authController.cadastrar);

// Rota para a tela de "Entrar"
router.post('/login', authController.login);

module.exports = router;