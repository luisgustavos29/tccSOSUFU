const { DataTypes } = require('sequelize');
const db = require('../config/database');

const Psicologo = db.define('Psicologo', {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    nome: { type: DataTypes.STRING(100), allowNull: false },
    email: { type: DataTypes.STRING(100), allowNull: false, unique: true },
    senha_hash: { type: DataTypes.STRING(255), allowNull: false },
    crp: { type: DataTypes.STRING(20), allowNull: false, unique: true },
    abordagem: { type: DataTypes.STRING(50) },
    url_foto: { type: DataTypes.STRING(255) },
    descricao: { type: DataTypes.TEXT }
}, {
    tableName: 'psicologos',
    timestamps: false
});

module.exports = Psicologo;