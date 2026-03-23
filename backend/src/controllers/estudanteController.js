const Estudante = require('../models/Estudante');

const estudanteController = {
    // ==========================================
    // Função 1: Buscar todos os estudantes (GET)
    // ==========================================
    listarTodos: async (req, res) => {
        try {
            const estudantes = await Estudante.findAll();
            res.json(estudantes);
        } catch (erro) {
            console.error('Erro ao buscar estudantes:', erro);
            res.status(500).json({ erro: 'Erro interno no servidor' });
        }
    },

    // ==========================================
    // Função 2: Cadastrar novo estudante (POST)
    // ==========================================
    cadastrar: async (req, res) => {
        try {
            const { nome, email, senha_hash, matricula_ufu } = req.body;

            const novoEstudante = await Estudante.create({
                nome,
                email,
                senha_hash,
                matricula_ufu
            });

            res.status(201).json(novoEstudante);
        } catch (erro) {
            console.error('Erro ao cadastrar estudante:', erro);
            res.status(400).json({ erro: 'Erro ao cadastrar. Verifique se o e-mail ou matrícula já existem.' });
        }
    },

    // ==========================================
    // Função 3: Fazer Login (POST)
    // ==========================================
    login: async (req, res) => {
        try {
            const { email, senha } = req.body;

            // 1. O segurança procura o estudante no banco de dados pelo Email
            const estudante = await Estudante.findOne({ where: { email: email } });

            // 2. Se não achar o email, barra na porta
            if (!estudante) {
                return res.status(404).json({ erro: 'E-mail não encontrado. Faça o cadastro.' });
            }

            // 3. Se achar o email, confere a senha
            if (estudante.senha_hash !== senha) {
                return res.status(401).json({ erro: 'Senha incorreta. Tente novamente.' }); 
            }

            // 4. Se passou por tudo, Login aprovado!
            res.status(200).json({ 
                mensagem: 'Login aprovado! Bem-vindo ao SOS UFU.',
                estudante: {
                    id: estudante.id,
                    nome: estudante.nome,
                    matricula: estudante.matricula_ufu
                }
            });

        } catch (erro) {
            console.error('Erro no login:', erro);
            res.status(500).json({ erro: 'Erro interno no servidor' });
        }
    }
};

module.exports = estudanteController;