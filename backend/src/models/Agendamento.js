const { DataTypes } = require('sequelize');
const db = require('../config/database');

const Agendamento = db.define('Agendamento', {
    id: { 
        type: DataTypes.INTEGER, 
        autoIncrement: true, 
        primaryKey: true 
    },
    data_hora: { 
        type: DataTypes.DATE, 
        allowNull: false 
    },
    status: { 
        type: DataTypes.STRING(20), 
        defaultValue: 'Pendente' 
    },
    link_reuniao: { 
        type: DataTypes.STRING(255) 
    },
    estudante_id: { 
        type: DataTypes.INTEGER, 
        allowNull: false 
    },
    psicologo_id: { 
        type: DataTypes.INTEGER, 
        allowNull: false 
    },
    // AQUI ESTÁ A NOSSA TRAVA DE SEGURANÇA 
    id_disponibilidade: { 
        type: DataTypes.INTEGER, 
        allowNull: false 
    }
}, {
    tableName: 'agendamentos',
    timestamps: false
});

module.exports = Agendamento;