const Psicologo = require('../models/Psicologo');

const psicologoController = {
    // 1. Busca TODOS os psicólogos (Usado na listagem principal)
    listarTodos: async (req, res) => {
        try {
            const psicologos = await Psicologo.findAll();
            res.json(psicologos);
        } catch (erro) {
            console.error('Erro ao buscar psicólogos:', erro);
            res.status(500).json({ erro: 'Erro interno no servidor' });
        }
    },

    // 2. Busca apenas UM psicólogo por ID (ESSENCIAL para a tela de calendário)
    buscarPorId: async (req, res) => {
        try {
            const { id } = req.params; // Pega o ID que vem na URL (ex: /psicologos/1)
            const psicologo = await Psicologo.findByPk(id);

            if (!psicologo) {
                return res.status(404).json({ erro: 'Psicólogo não encontrado' });
            }

            res.json(psicologo);
        } catch (erro) {
            console.error('Erro ao buscar psicólogo por ID:', erro);
            res.status(500).json({ erro: 'Erro interno no servidor ao buscar perfil' });
        }
    }
};

module.exports = psicologoController;