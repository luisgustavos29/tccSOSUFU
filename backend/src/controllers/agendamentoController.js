const Agendamento = require('../models/Agendamento');
const Psicologo = require('../models/Psicologo');

Agendamento.belongsTo(Psicologo, { foreignKey: 'psicologo_id' });
Psicologo.hasMany(Agendamento, { foreignKey: 'psicologo_id' });

const agendamentoController = {
    agendar: async (req, res) => {
        try {
            const estudante_id = req.usuario.id; 
            const { id_psicologo, id_disponibilidade, data_hora } = req.body;

            const conflito = await Agendamento.findOne({
                where: {
                    psicologo_id: id_psicologo,
                    id_disponibilidade: id_disponibilidade,
                    status: 'Confirmado' 
                }
            });

            if (conflito) {
                return res.status(400).json({ 
                    erro: 'Horário Indisponível',
                    mensagem: 'Este horário já foi reservado por outro estudante.' 
                });
            }

            const novoAgendamento = await Agendamento.create({
                data_hora: data_hora, 
                status: 'Confirmado', 
                estudante_id: estudante_id,
                psicologo_id: id_psicologo,
                id_disponibilidade: id_disponibilidade
            });

            res.status(201).json({
                mensagem: 'Agendamento confirmado com sucesso!',
                agendamento: novoAgendamento
            });

        } catch (erro) {
            console.error('Erro ao agendar consulta:', erro);
            res.status(500).json({ erro: 'Erro interno ao processar agendamento.' });
        }
    },

    buscarPorAluno: async (req, res) => {
        try {
            const estudante_id = req.usuario.id;
            const consultas = await Agendamento.findAll({
                where: { estudante_id: estudante_id },
                include: [{ model: Psicologo, attributes: ['nome'] }], 
                order: [['data_hora', 'DESC']]
            });
            res.status(200).json(consultas);
        } catch (erro) {
            console.error("Erro no backend:", erro);
            res.status(500).json({ erro: 'Erro ao buscar suas consultas.' });
        }
    },

    buscarPorPsicologo: async (req, res) => {
        try {
            const { id } = req.params;
            const consultas = await Agendamento.findAll({
                where: { psicologo_id: id }
            });
            res.status(200).json(consultas);
        } catch (erro) {
            res.status(500).json({ erro: 'Erro ao buscar agenda do profissional.' });
        }
    },

    cancelar: async (req, res) => {
        try {
            const { id } = req.params;
            const estudante_id = req.usuario.id;

            const agendamento = await Agendamento.findOne({
                where: { id: id, estudante_id: estudante_id }
            });

            if (!agendamento) {
                return res.status(404).json({ erro: 'Agendamento não encontrado.' });
            }

            agendamento.status = 'Cancelado';
            await agendamento.save();

            res.status(200).json({ mensagem: 'Consulta cancelada com sucesso.' });
        } catch (erro) {
            res.status(500).json({ erro: 'Erro ao cancelar.' });
        }
    }
};

module.exports = agendamentoController;