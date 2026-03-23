const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
    // 1. Tenta pegar o token do cabeçalho da requisição
    const authHeader = req.headers.authorization;

    // Se não tiver cabeçalho, barra na porta
    if (!authHeader) {
        return res.status(401).json({ erro: 'Acesso negado. Token não fornecido.' });
    }

    // 2. O token padrão de mercado vem escrito "Bearer eyJhb..." (Portador do token)
    const partes = authHeader.split(' ');
    if (partes.length !== 2 || partes[0] !== 'Bearer') {
        return res.status(401).json({ erro: 'Formato de token inválido.' });
    }

    const token = partes[1];

    try {
        // 3. A MÁGICA: Verifica se o crachá é verdadeiro usando a nossa chave secreta
        const decodificado = jwt.verify(token, 'chave_secreta_sos_ufu');

        // Se for verdadeiro, guarda o ID do usuário na requisição
        req.usuario = decodificado;

        // 4. Permite que a rota continue o seu trabalho
        next();
    } catch (erro) {
        // Se o token for falso ou estiver expirado (passou de 24h), barra na porta
        return res.status(401).json({ erro: 'Token inválido ou expirado. Faça login novamente.' });
    }
};

module.exports = authMiddleware;