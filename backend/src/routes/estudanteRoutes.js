const express = require('express');
const router = express.Router();
const estudanteController = require('../controllers/estudanteController');

// Rota para LER todos (GET)
router.get('/', estudanteController.listarTodos);

// Rota para CRIAR novo estudante (POST)
router.post('/', estudanteController.cadastrar);

// Rota para FAZER LOGIN (POST)
router.post('/login', estudanteController.login);

module.exports = router;