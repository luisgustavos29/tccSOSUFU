
function mostrarModalConfirmacao(mensagem, onConfirm) {
   
    const overlay = document.createElement('div');
    overlay.style.position = 'fixed';
    overlay.style.top = '0';
    overlay.style.left = '0';
    overlay.style.width = '100%';
    overlay.style.height = '100%';
    overlay.style.backgroundColor = 'rgba(0, 0, 0, 0.6)';
    overlay.style.display = 'flex';
    overlay.style.justifyContent = 'center';
    overlay.style.alignItems = 'center';
    overlay.style.zIndex = '9999';

    const modal = document.createElement('div');
    modal.style.background = '#fff';
    modal.style.padding = '25px';
    modal.style.borderRadius = '16px';
    modal.style.width = '85%';
    modal.style.maxWidth = '320px';
    modal.style.textAlign = 'center';
    modal.style.boxShadow = '0 10px 25px rgba(0,0,0,0.2)';

    const texto = document.createElement('p');
    texto.textContent = mensagem;
    texto.style.marginBottom = '25px';
    texto.style.color = '#333';
    texto.style.fontSize = '15px';
    texto.style.fontWeight = '500';

    // Container dos botões
    const btnContainer = document.createElement('div');
    btnContainer.style.display = 'flex';
    btnContainer.style.justifyContent = 'space-between';
    btnContainer.style.gap = '12px';

    const btnNao = document.createElement('button');
    btnNao.textContent = 'Voltar';
    btnNao.style.flex = '1';
    btnNao.style.padding = '12px';
    btnNao.style.border = 'none';
    btnNao.style.borderRadius = '10px';
    btnNao.style.background = '#F2F4F8';
    btnNao.style.color = '#5C6A82';
    btnNao.style.fontWeight = 'bold';
    btnNao.style.cursor = 'pointer';

    const btnSim = document.createElement('button');
    btnSim.textContent = 'Sim, cancelar';
    btnSim.style.flex = '1';
    btnSim.style.padding = '12px';
    btnSim.style.border = 'none';
    btnSim.style.borderRadius = '10px';
    btnSim.style.background = '#E74C3C';
    btnSim.style.color = '#fff';
    btnSim.style.fontWeight = 'bold';
    btnSim.style.cursor = 'pointer';

    // Ações dos botões
    btnNao.onclick = () => document.body.removeChild(overlay); 
    btnSim.onclick = () => {
        document.body.removeChild(overlay); 
        onConfirm(); 
    };


    btnContainer.appendChild(btnNao);
    btnContainer.appendChild(btnSim);
    modal.appendChild(texto);
    modal.appendChild(btnContainer);
    overlay.appendChild(modal);
    document.body.appendChild(overlay);
}

document.addEventListener('DOMContentLoaded', async () => {
    const token = localStorage.getItem('token_sos_ufu');
    const listaContainer = document.getElementById('lista-sessoes');

    if (!token) {
        window.location.href = 'index.html';
        return;
    }

    try {
        // BUSCA NO BACKEND
        const response = await fetch('http://localhost:3000/agendamentos/meus', {
            method: 'GET',
            headers: { 
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });

        if (response.ok) {
            const agendamentos = await response.json();
            listaContainer.innerHTML = ''; 

            const agendamentosAtivos = agendamentos.filter(ag => ag.status !== 'Cancelado');

            if (agendamentosAtivos.length === 0) {
                listaContainer.innerHTML = `
                    <div style="text-align: center; margin-top: 50px; padding: 20px;">
                        <span class="material-symbols-rounded" style="font-size: 64px; color: #ccc;">event_busy</span>
                        <p style="color: var(--cor-texto-secundario); margin-top: 10px;">Você ainda não possui sessões agendadas.</p>
                    </div>`;
                return;
            }

            agendamentosAtivos.forEach(ag => {
                const dataObj = new Date(ag.data_hora);
                const dataFormatada = dataObj.toLocaleDateString('pt-BR');
                const horaFormatada = dataObj.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });

                const card = document.createElement('div');
                card.className = 'card-sessao';
                
                card.innerHTML = `
                    <div class="sessao-header">
                        <span class="psicologo-nome">Psic. ${ag.Psicologo ? ag.Psicologo.nome : 'Não informado'}</span>
                        <span class="status-tag status-${ag.status.toLowerCase()}">${ag.status}</span>
                    </div>
                    <div class="sessao-info">
                        <span class="material-symbols-rounded">calendar_today</span>
                        <span>${dataFormatada}</span>
                    </div>
                    <div class="sessao-info">
                        <span class="material-symbols-rounded">schedule</span>
                        <span>${horaFormatada}</span>
                    </div>
                    ${ag.link_reuniao ? `
                        <button class="btn-reuniao" onclick="window.open('${ag.link_reuniao}', '_blank')">
                            Acessar Sessão Online
                        </button>
                    ` : ''}
                    
                    ${ag.status === 'Confirmado' ? `
                        <button class="btn-cancelar" style="margin-top: 15px; width: 100%; padding: 8px; background: transparent; border: 1px solid #E74C3C; color: #E74C3C; border-radius: 8px; cursor: pointer; font-weight: bold; transition: 0.3s;">
                            Cancelar Consulta
                        </button>
                    ` : ''}
                `;

                listaContainer.appendChild(card);

                if (ag.status === 'Confirmado') {
                    const btnCancelar = card.querySelector('.btn-cancelar');
                    
                    btnCancelar.addEventListener('mouseover', () => {
                        btnCancelar.style.background = '#E74C3C';
                        btnCancelar.style.color = '#FFF';
                    });
                    btnCancelar.addEventListener('mouseout', () => {
                        btnCancelar.style.background = 'transparent';
                        btnCancelar.style.color = '#E74C3C';
                    });

                    btnCancelar.addEventListener('click', () => {
                        mostrarModalConfirmacao('Tem certeza que deseja cancelar este agendamento? Esta ação não pode ser desfeita.', async () => {
                            btnCancelar.textContent = 'Cancelando...';
                            btnCancelar.disabled = true;

                            try {
                                const resp = await fetch(`http://localhost:3000/agendamentos/${ag.id}/cancelar`, {
                                    method: 'PATCH',
                                    headers: {
                                        'Authorization': `Bearer ${token}`
                                    }
                                });

                                if (resp.ok) {
                                    window.location.reload(); 
                                } else {
                                    alert('Erro ao cancelar a consulta. Tente novamente.');
                                    btnCancelar.textContent = 'Cancelar Consulta';
                                    btnCancelar.disabled = false;
                                }
                            } catch (error) {
                                alert('Servidor offline ou erro de rede.');
                                btnCancelar.textContent = 'Cancelar Consulta';
                                btnCancelar.disabled = false;
                            }
                        });
                    });
                }
            });
        } else {
            listaContainer.innerHTML = '<p style="text-align:center; color: red;">Erro ao carregar sessões do servidor.</p>';
        }
    } catch (error) {
        console.error("Erro na requisição:", error);
        listaContainer.innerHTML = '<p style="text-align:center; color: red;">Servidor offline ou erro de conexão.</p>';
    }
});