const Conteudo = require('../models/Conteudo');

const conteudoController = {
    // ==========================================
    // Função 1: Adicionar novo conteúdo (POST) - Usado pelo Administrador
    // ==========================================
    criar: async (req, res) => {
        try {
            const { titulo, texto_conteudo, categoria, url_video } = req.body;

            const novoConteudo = await Conteudo.create({
                titulo,
                texto_conteudo,
                categoria,
                url_video
            });

            res.status(201).json({
                mensagem: 'Conteúdo de apoio cadastrado com sucesso! 📚',
                conteudo: novoConteudo
            });

        } catch (erro) {
            console.error('Erro ao cadastrar conteúdo:', erro);
            res.status(400).json({ erro: 'Erro ao cadastrar o material. Verifique os dados.' });
        }
    },

    // ==========================================
    // Função 2: Listar todos os conteúdos (GET) - Usado pelo Estudante
    // ==========================================
    listarTodos: async (req, res) => {
        try {
            const conteudos = await Conteudo.findAll();
            
            if (conteudos.length === 0) {
                return res.status(404).json({ mensagem: 'Nenhum conteúdo disponível no momento.' });
            }

            res.status(200).json(conteudos);

        } catch (erro) {
            console.error('Erro ao buscar conteúdos:', erro);
            res.status(500).json({ erro: 'Erro interno no servidor ao buscar materiais.' });
        }
    },

    // ==========================================
    // Função 3: Buscar por Categoria (GET) 
    // ==========================================
    buscarPorCategoria: async (req, res) => {
        try {
            const { categoria } = req.params;

            const conteudos = await Conteudo.findAll({
                where: { categoria }
            });

            if (conteudos.length === 0) {
                return res.status(404).json({ mensagem: `Nenhum conteúdo encontrado para a categoria: ${categoria}` });
            }

            res.status(200).json(conteudos);

        } catch (erro) {
            console.error('Erro ao buscar por categoria:', erro);
            res.status(500).json({ erro: 'Erro interno no servidor ao filtrar materiais.' });
        }
    }
};

module.exports = conteudoController;