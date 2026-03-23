const express = require('express');
const router = express.Router();
const agendamentoController = require('../controllers/agendamentoController');
const authMiddleware = require('../middlewares/authMiddleware'); 

router.use(authMiddleware);

router.post('/', agendamentoController.agendar);

// Alterado de '/aluno/:id' para '/meus' para bater com o fetch do frontend
router.get('/meus', agendamentoController.buscarPorAluno);

router.get('/psicologo/:id', agendamentoController.buscarPorPsicologo);
router.patch('/:id/cancelar', agendamentoController.cancelar);

module.exports = router;