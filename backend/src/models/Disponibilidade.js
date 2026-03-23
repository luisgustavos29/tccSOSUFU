const { DataTypes } = require('sequelize');
const db = require('../config/database');

const Disponibilidade = db.define('Disponibilidade', {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    dia_semana: { type: DataTypes.STRING(20), allowNull: false },
    hora_inicio: { type: DataTypes.TIME, allowNull: false },
    hora_fim: { type: DataTypes.TIME, allowNull: false },
    psicologo_id: { type: DataTypes.INTEGER, allowNull: false }
}, {
    tableName: 'disponibilidade',
    timestamps: false
});

module.exports = Disponibilidade;