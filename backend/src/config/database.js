const Sequelize = require('sequelize');
require('dotenv').config(); // Carrega as senhas do arquivo .env

// Cria a conexão com o banco de dados usando o Sequelize
const connection = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASS,
    {
        host: process.env.DB_HOST,
        dialect: 'mysql',
        timezone: '-03:00',
        logging: false, // Deixa o terminal mais limpo
    }
);

// Exporta a conexão para o app.js poder usar
module.exports = connection;