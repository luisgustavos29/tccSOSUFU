/* ==========================================
Lógica Dinâmica de Agendamento
========================================== */

function obterProximaData(diaSemana, horaInicio) {
    const dias = { 'Domingo': 0, 'Segunda-feira': 1, 'Terça-feira': 2, 'Quarta-feira': 3, 'Quinta-feira': 4, 'Sexta-feira': 5, 'Sábado': 6 };
    const hoje = new Date();
    let diff = dias[diaSemana] - hoje.getDay();
    if (diff <= 0) diff += 7; 
    const proximaData = new Date(hoje);
    proximaData.setDate(hoje.getDate() + diff);
    const [hora, minuto] = horaInicio.split(':');
    proximaData.setHours(hora, minuto, 0, 0);
    return proximaData;
}

document.addEventListener('DOMContentLoaded', async () => {
    const urlParams = new URLSearchParams(window.location.search);
    const psicologoId = urlParams.get('id_psicologo');
    const token = localStorage.getItem('token_sos_ufu');

    if (!token || !psicologoId) {
        window.location.href = 'dashboard.html';
        return;
    }

    const secaoHorarios = document.getElementById('lista-horarios').parentElement; 
    const nomePsicologoTela = document.getElementById('nome-psicologo-tela');
    const especialidadeTela = document.getElementById('especialidade-tela');
    const fotoPsicologo = document.getElementById('foto-psicologo-tela');
    const iconeFallback = document.getElementById('icone-fallback');
    const btnConfirmar = document.getElementById('btn-confirmar');
    const msgAgendamento = document.getElementById('msg-agendamento');
    
    let horarioSelecionado = null;

    try {
        const respPsicologo = await fetch(`http://localhost:3000/psicologos/${psicologoId}`, {
            headers: { 'Authorization': `Bearer ${token}` }
        });
        
        if (respPsicologo.ok) {
            const psicologo = await respPsicologo.json();
            nomePsicologoTela.textContent = psicologo.nome;
            especialidadeTela.textContent = psicologo.abordagem || 'Atendimento Psicológico';
            
            if (psicologo.url_foto) {
                fotoPsicologo.src = psicologo.url_foto;
                fotoPsicologo.style.display = 'block';
                iconeFallback.style.display = 'none';
            }
        }

        const respHorarios = await fetch(`http://localhost:3000/disponibilidades/psicologo/${psicologoId}`, {
            headers: { 'Authorization': `Bearer ${token}` }
        });

        secaoHorarios.innerHTML = '<h3>Horários Disponíveis</h3>'; 

        if (respHorarios.ok) {
            const horariosBackend = await respHorarios.json();

            if (horariosBackend.length === 0) {
                secaoHorarios.innerHTML += '<p style="font-size: 13px; color: #E74C3C; text-align: center;">Nenhum horário disponível no momento.</p>';
                return;
            }
            
            const horariosPorDia = {};
            horariosBackend.forEach(horario => {
                if (!horariosPorDia[horario.dia_semana]) {
                    horariosPorDia[horario.dia_semana] = []; 
                }
                horariosPorDia[horario.dia_semana].push(horario); 
            });

            for (const dia in horariosPorDia) {
                const divGrupo = document.createElement('div');
                divGrupo.className = 'grupo-dia';

                const h4Titulo = document.createElement('h4');
                h4Titulo.className = 'titulo-dia';
                h4Titulo.textContent = dia;
                divGrupo.appendChild(h4Titulo);

                const divGrid = document.createElement('div');
                divGrid.className = 'grid-horarios';

                horariosPorDia[dia].forEach(horario => {
                    const btn = document.createElement('button');
                    btn.className = 'btn-horario';
                    
                    btn.textContent = horario.hora_inicio.substring(0, 5); 
                    
                    if (horario.ocupado) {
                        btn.classList.add('ocupado');
                        btn.disabled = true; 
                        btn.title = 'Horário não disponível'; 
                    } else {
                        btn.addEventListener('click', () => {
                            document.querySelectorAll('.btn-horario').forEach(b => b.classList.remove('selecionado'));
                            btn.classList.add('selecionado');
                            horarioSelecionado = horario;
                            btnConfirmar.disabled = false; 
                        });
                    }

                    divGrid.appendChild(btn);
                });

                divGrupo.appendChild(divGrid);
                secaoHorarios.appendChild(divGrupo); 
            }
        } else {
            secaoHorarios.innerHTML += '<p style="color: red; text-align: center;">Erro ao carregar agenda.</p>';
        }

    } catch (error) {
        console.error("Erro ao comunicar com a API:", error);
        secaoHorarios.innerHTML += '<p style="color: red; text-align: center;">Servidor offline.</p>';
    }

    btnConfirmar.addEventListener('click', async () => {
        if (!horarioSelecionado) return;

        btnConfirmar.disabled = true;
        btnConfirmar.textContent = "Agendando...";

        try {
            const response = await fetch('http://localhost:3000/agendamentos', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    id_psicologo: psicologoId,
                    id_disponibilidade: horarioSelecionado.id,
                    data_hora: obterProximaData(horarioSelecionado.dia_semana, horarioSelecionado.hora_inicio)
                })
            });

            if (response.ok) {
                msgAgendamento.style.color = '#1ABC9C';
                msgAgendamento.textContent = 'Agendamento confirmado com sucesso! 🎉';
                msgAgendamento.style.display = 'block';
                setTimeout(() => window.location.reload(), 2000); 
            } else {
                // CAPTURA A MENSAGEM EXATA DO BACKEND
                const erroData = await response.json();
                throw new Error(erroData.mensagem || 'Falha ao agendar');
            }
        } catch (error) {
            btnConfirmar.disabled = false;
            btnConfirmar.textContent = "Confirmar Agendamento";
            msgAgendamento.style.color = '#E74C3C';
            // EXIBE A MENSAGEM DO BACKEND NA TELA
            msgAgendamento.textContent = error.message; 
            msgAgendamento.style.display = 'block';
        }
    });
});