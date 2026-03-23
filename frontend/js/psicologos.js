/* ==========================================
   Lógica INTEGRADA COM A API
========================================== */

document.addEventListener('DOMContentLoaded', () => {

    const containerLista = document.getElementById('lista-psicologos');

    async function carregarPsicologos() {
        try {
            
            const resposta = await fetch('http://localhost:3000/psicologos'); 
            
            if (!resposta.ok) {
                throw new Error('Erro ao buscar do banco de dados');
            }

            const psicologosDoBanco = await resposta.json();
            
            containerLista.innerHTML = ''; 

            // Se o banco estiver vazio
            if (psicologosDoBanco.length === 0) {
                containerLista.innerHTML = '<p style="text-align: center;">Nenhum profissional cadastrado no momento.</p>';
                return;
            }

            psicologosDoBanco.forEach(psico => {
                const cardHTML = `
                    <article class="card-psicologo">
                        <div class="perfil-psicologo">
                            <img src="${psico.url_foto || 'assets/default-avatar.png'}" alt="Foto de ${psico.nome}" class="foto-psicologo">
                            <div class="info-psicologo">
                                <h4>${psico.nome}</h4>
                                <p>${psico.descricao}</p>
                            </div>
                        </div>
                        <div class="tags-psicologo">
                            <span class="tag-crp">${psico.crp}</span>
                            <span class="tag-abordagem">${psico.abordagem}</span>
                        </div>
                        <button class="btn-agendar" onclick="window.location.href='calendario.html?id_psicologo=${psico.id}'">
                            <span class="material-symbols-rounded">calendar_month</span>
                            Ver Horários
                        </button>
                    </article>
                `;
                containerLista.innerHTML += cardHTML;
            });

        } catch (erro) {
            console.error(erro);
            containerLista.innerHTML = '<p style="text-align: center; color: var(--cor-erro);">Erro ao conectar com a API. Verifique se o backend está rodando.</p>';
        }
    }

    carregarPsicologos();

    // Funcionalidade de Emergência
    const btnEmergenciaNav = document.getElementById('btn-emergencia-nav');
    if (btnEmergenciaNav) {
        btnEmergenciaNav.addEventListener('click', () => {
            if(confirm('Você será direcionado para o CVV (188). Deseja continuar?')) {
                window.location.href = 'tel:188'; 
            }
        });
    }
});