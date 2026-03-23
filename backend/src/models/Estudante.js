const { DataTypes } = require('sequelize');
const db = require('../config/database');

const Estudante = db.define('Estudante', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    nome: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    email: {
        type: DataTypes.STRING(100),
        allowNull: false,
        unique: true
    },
    senha_hash: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    matricula_ufu: {
        type: DataTypes.STRING(20),
        allowNull: false,
        unique: true
    }
}, {
    tableName: 'estudantes', 
    timestamps: false 
});

module.exports = Estudante;