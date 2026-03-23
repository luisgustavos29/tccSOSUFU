const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Estudante = require('../models/Estudante');

const authController = {
    // ==========================================
    // Função 1: CRIAR CONTA (Cadastro)
    // ==========================================
    cadastrar: async (req, res) => {
        try {
            // Pega os dados que o usuário digitou no aplicativo (ou Thunder Client)
            const { nome, email, senha, matricula_ufu } = req.body;

            // 1. Verifica se o e-mail ou a matrícula já estão cadastrados
            const estudanteExistente = await Estudante.findOne({ where: { email } });
            if (estudanteExistente) {
                return res.status(400).json({ erro: 'Este e-mail já está em uso.' });
            }

            // 2. Criptografa a senha (Gera o Hash)
            const salt = await bcrypt.genSalt(10);
            const senhaCriptografada = await bcrypt.hash(senha, salt);

            // 3. Salva no banco de dados usando o nome da coluna (senha_hash)
            const novoEstudante = await Estudante.create({
                nome,
                email,
                senha_hash: senhaCriptografada, 
                matricula_ufu
            });

            res.status(201).json({ mensagem: 'Conta criada com sucesso! 🎉' });

        } catch (erro) {
            console.error('Erro no cadastro:', erro);
            res.status(500).json({ erro: 'Erro interno ao criar conta.' });
        }
    },

    // ==========================================
    // Função 2: ENTRAR (Login)
    // ==========================================
    login: async (req, res) => {
        try {
            const { email, senha } = req.body;

            // 1. Busca o estudante no banco pelo e-mail
            const estudante = await Estudante.findOne({ where: { email } });
            if (!estudante) {
                return res.status(404).json({ erro: 'E-mail ou senha incorretos.' }); 
            }

            // 2. Compara a senha digitada com a senha criptografada do banco
            const senhaCorreta = await bcrypt.compare(senha, estudante.senha_hash);
            if (!senhaCorreta) {
                return res.status(401).json({ erro: 'E-mail ou senha incorretos.' });
            }

            // 3. GERA O CRACHÁ (Token JWT)
            const token = jwt.sign(
                { id: estudante.id }, // Dados que vão dentro do crachá
                'chave_secreta_sos_ufu', // A assinatura de segurança do nosso servidor
                { expiresIn: '24h' } // O login expira em 1 dia
            );

            // Devolve o token e os dados do usuário (sem a senha!)
            res.status(200).json({
                mensagem: 'Login realizado com sucesso! 🚀',
                token: token,
                estudante: {
                    id: estudante.id,
                    nome: estudante.nome,
                    email: estudante.email
                }
            });

        } catch (erro) {
            console.error('Erro no login:', erro);
            res.status(500).json({ erro: 'Erro interno ao realizar login.' });
        }
    }
};

module.exports = authController;