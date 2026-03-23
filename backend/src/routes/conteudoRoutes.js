const express = require('express');
const router = express.Router();
const conteudoController = require('../controllers/conteudoController');
const authMiddleware = require('../middlewares/authMiddleware');

// Protege as rotas com o Token JWT
router.use(authMiddleware);

// Rota POST para CRIAR um novo material
router.post('/', conteudoController.criar);

// Rota GET para LISTAR TODOS os materiais
router.get('/', conteudoController.listarTodos);

// Rota GET para FILTRAR materiais por categoria
router.get('/categoria/:categoria', conteudoController.buscarPorCategoria);

module.exports = router;