/* ==========================================
   Configurações centrais de comunicação com o Backend
========================================== */

const API_BASE_URL = 'http://localhost:3000';

// Função utilitária para pegar o token salvo no navegador
function obterToken() {
    return localStorage.getItem('token_sos_ufu');
}

// Função utilitária para deslogar o usuário
function sair() {
    localStorage.removeItem('token_sos_ufu');
    window.location.href = 'index.html';
}