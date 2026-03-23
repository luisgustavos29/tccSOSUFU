const { DataTypes } = require('sequelize');
const db = require('../config/database');

const Conteudo = db.define('Conteudo', {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    titulo: { type: DataTypes.STRING(100), allowNull: false },
    texto_conteudo: { type: DataTypes.TEXT, allowNull: false },
    categoria: { type: DataTypes.STRING(50) },
    url_video: { type: DataTypes.STRING(255) }
}, {
    tableName: 'conteudos',
    timestamps: false
});

module.exports = Conteudo;