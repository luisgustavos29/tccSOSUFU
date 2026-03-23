const express = require('express');
const router = express.Router();
const psicologoController = require('../controllers/psicologoController');

// 1. Rota para listar TODOS os psicólogos
// Usada na página psicologos.html para desenhar todos os cards
router.get('/', psicologoController.listarTodos);

// 2. Rota para buscar UM psicólogo específico pelo ID
// Usada na página calendario.html para carregar nome, foto e especialidade no topo
// O ':id' é um parâmetro dinâmico que o Controller vai ler
router.get('/:id', psicologoController.buscarPorId);

module.exports = router;