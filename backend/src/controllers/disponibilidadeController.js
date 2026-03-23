const Disponibilidade = require('../models/Disponibilidade');
const Agendamento = require('../models/Agendamento'); 

const disponibilidadeController = {
    // ==========================================
    // Função 1: Adicionar um novo horário (POST)
    // ==========================================
    criar: async (req, res) => {
        try {
            const { dia_semana, hora_inicio, hora_fim, psicologo_id } = req.body;
            const novaDisponibilidade = await Disponibilidade.create({
                dia_semana,
                hora_inicio,
                hora_fim,
                psicologo_id
            });
            res.status(201).json({
                mensagem: 'Horário cadastrado com sucesso na agenda! 🕒',
                disponibilidade: novaDisponibilidade
            });
        } catch (erro) {
            console.error('Erro ao cadastrar disponibilidade:', erro);
            res.status(400).json({ erro: 'Erro ao cadastrar o horário. Verifique os dados.' });
        }
    },

    // ==========================================
    // Função 2: Buscar a agenda (COM CHECAGEM DE OCUPADO)
    // ==========================================
    buscarPorPsicologo: async (req, res) => {
        try {
            const { psicologo_id } = req.params;

            // 1. Busca todos os horários base do médico
            const disponibilidades = await Disponibilidade.findAll({
                where: { psicologo_id }
            });

            if (disponibilidades.length === 0) {
                return res.status(200).json([]);
            }

            // 2. Busca os agendamentos já confirmados/pendentes para esse médico
            const agendamentosAtivos = await Agendamento.findAll({
                where: { 
                    psicologo_id: psicologo_id,
                    status: ['Pendente', 'Confirmado'] 
                }
            });

            // 3. Extrai apenas os IDs de disponibilidade que já foram ocupados
            const idsOcupados = agendamentosAtivos.map(ag => ag.id_disponibilidade);

            // 4. Injeta a tag "ocupado" direto na resposta para o Front-end
            const gradeComStatus = disponibilidades.map(disp => {
                const dispJson = disp.toJSON();
                // Se o ID dessa janela estiver na lista de agendamentos, está ocupado!
                dispJson.ocupado = idsOcupados.includes(disp.id); 
                return dispJson;
            });

            res.status(200).json(gradeComStatus);

        } catch (erro) {
            console.error('Erro ao buscar disponibilidades:', erro);
            res.status(500).json({ erro: 'Erro interno no servidor.' });
        }
    },

    // ==========================================
    // Função 3: Excluir um horário da agenda (DELETE)
    // ==========================================
    deletar: async (req, res) => {
        try {
            const { id } = req.params;
            const disponibilidade = await Disponibilidade.findByPk(id);

            if (!disponibilidade) {
                return res.status(404).json({ erro: 'Horário não encontrado.' });
            }

            await disponibilidade.destroy();
            res.status(200).json({ mensagem: 'Horário removido da agenda com sucesso.' });

        } catch (erro) {
            console.error('Erro ao deletar disponibilidade:', erro);
            res.status(500).json({ erro: 'Erro interno no servidor ao deletar.' });
        }
    }
};

module.exports = disponibilidadeController;