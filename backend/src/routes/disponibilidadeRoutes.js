const express = require('express');
const router = express.Router();
const disponibilidadeController = require('../controllers/disponibilidadeController');
const authMiddleware = require('../middlewares/authMiddleware');

// Segurança aqui no topo! 
// Ninguém acessa a agenda sem apresentar o Token JWT.
router.use(authMiddleware);

// Rota POST para ADICIONAR um horário na agenda
router.post('/', disponibilidadeController.criar);

// Rota GET para BUSCAR todos os horários de um psicólogo
router.get('/psicologo/:psicologo_id', disponibilidadeController.buscarPorPsicologo);

// Rota DELETE para REMOVER um horário específico
router.delete('/:id', disponibilidadeController.deletar);

module.exports = router;