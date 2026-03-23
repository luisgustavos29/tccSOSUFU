/* ==========================================
   Lógica da Tela Principal (Dashboard)
========================================== */

document.addEventListener('DOMContentLoaded', () => {
    // 1. Verificação de Segurança (Proteção da Rota Frontend)
    const token = obterToken();

    if (!token) {
        window.location.href = 'index.html';
        return;
    }
    
    const nomeUsuario = document.getElementById('nome-usuario');
    const nomeSalvo = localStorage.getItem('usuario_nome'); 
    
    if (nomeSalvo) {
        const partesNome = nomeSalvo.split(' ');
        
        let nomeExibicao = partesNome[0];
        
        if (partesNome.length > 1) {
            nomeExibicao += ' ' + partesNome[1];
        }
        
        nomeUsuario.textContent = nomeExibicao;
    } else {
        nomeUsuario.textContent = "Estudante";
    }

    const btnEmergencia = document.getElementById('btn-emergencia');
    if (btnEmergencia) {
        btnEmergencia.addEventListener('click', () => {
            if(confirm('Você será direcionado para o CVV (188) para apoio emocional imediato. Deseja continuar?')) {
                window.location.href = 'tel:188'; 
            }
        });
    }
});