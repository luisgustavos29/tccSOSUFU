require('dotenv').config(); // Carrega as senhas do .env
const express = require('express');
const cors = require('cors');
const db = require('./config/database'); // Puxa a conexão com o banco

const app = express();

// --- Filtros da API ---
app.use(cors()); 
app.use(express.json()); 

// --- Importação das Rotas da API ---
const estudanteRoutes = require('./routes/estudanteRoutes');
const psicologoRoutes = require('./routes/psicologoRoutes'); 
const disponibilidadeRoutes = require('./routes/disponibilidadeRoutes');
const agendamentoRoutes = require('./routes/agendamentoRoutes');
const authRoutes = require('./routes/authRoutes'); 
const conteudoRoutes = require('./routes/conteudoRoutes');

// --- Uso das Rotas ---
app.use('/estudantes', estudanteRoutes);
app.use('/psicologos', psicologoRoutes);  
app.use('/disponibilidades', disponibilidadeRoutes);
app.use('/agendamentos', agendamentoRoutes);
app.use('/auth', authRoutes);
app.use('/conteudos', conteudoRoutes);
                 
// --- Rota de Teste ---
app.get('/', (req, res) => {
    res.json({ message: 'Bem-vindo à API do SOS UFU! 🚀' });
});

// --- Ligando o Servidor e o Banco ---
const PORT = process.env.PORT || 3000;

db.authenticate()
    .then(() => {
        console.log('✅ Conexão com o MySQL (sos_ufu) estabelecida com sucesso!');
        
        app.listen(PORT, () => {
            console.log(`🚀 Servidor rodando na porta ${PORT}`);
            console.log(`👉 Acesse: http://localhost:${PORT}`);
        });
    })
    .catch((erro) => {
        console.error('❌ Erro crítico: Não foi possível conectar ao banco de dados.', erro);
    });