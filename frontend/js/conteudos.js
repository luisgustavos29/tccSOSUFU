/* ==========================================
   Lógica da Tela de Conteúdos Livres
========================================== */

document.addEventListener('DOMContentLoaded', () => {
    
    const btnVoltar = document.getElementById('btn-voltar');
    
    btnVoltar.addEventListener('click', () => {
        const token = localStorage.getItem('token_sos_ufu'); 
        
        if (token) {
            window.location.href = 'dashboard.html';
        } else {
            window.location.href = 'index.html';
        }
    });

    const abas = document.querySelectorAll('.aba');
    
    abas.forEach(aba => {
        aba.addEventListener('click', () => {
            abas.forEach(a => a.classList.remove('ativa'));
            aba.classList.add('ativa');
        });
    });

    const btnEmergenciaNav = document.getElementById('btn-emergencia-nav');
    if (btnEmergenciaNav) {
        btnEmergenciaNav.addEventListener('click', () => {
            if(confirm('Você será direcionado para o CVV (188). Deseja continuar?')) {
                window.location.href = 'tel:188'; 
            }
        });
    }
});