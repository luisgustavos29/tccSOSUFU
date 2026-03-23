/* ==========================================
   Inteligência da Tela Dinâmica de Vídeos
========================================== */

document.addEventListener('DOMContentLoaded', () => {
    
    // 1. O "Banco de Dados Falso" (Mock)
    // Aqui guardamos 2 vídeos reais do YouTube para cada categoria
    const bancoDeVideos = {
        'tecnicas': {
            titulo: 'Técnicas Guiadas',
            descricao: 'Acompanhe estes exercícios práticos para controle rápido de ansiedade.',
            videos: [
                {
                    titulo: 'Respiração Quadrada',
                    descricao: 'Técnica simples para acalmar os batimentos cardíacos.',
                    youtubeId: 'QVWkgfy3Qpw' 
                },
                {
                    titulo: 'Respiração Diafragmática',
                    descricao: 'Técnica para tomar consciência da força vital.',
                    youtubeId: 'Z4qzwrP3JA8'
                }
            ]
        },
        'estudos': {
            titulo: 'Foco e Estudos',
            descricao: 'Dicas práticas para melhorar a produtividade e organização na universidade.',
            videos: [
                {
                    titulo: 'Técnica Pomodoro na Prática',
                    descricao: 'Como dividir o tempo de estudo e não fritar o cérebro.',
                    youtubeId: 'mNBmG24djoY'
                },
                {
                    titulo: 'Como fazer anotações eficientes',
                    descricao: 'Método Cornell para universitários.',
                    youtubeId: 'P2VKs8lOLHg' 
                }
            ]
        },
        'bem-estar': {
            titulo: 'Bem-estar e Rotina',
            descricao: 'Cuidados essenciais com o seu corpo e mente durante a graduação.',
            videos: [
                {
                    titulo: 'A importância da Higiene do Sono',
                    descricao: 'Por que virar a noite estudando faz mal para a memória.',
                    youtubeId: '8RgPyNiN6Dw'
                },
                {
                    titulo: 'Alimentação e Foco',
                    descricao: 'Como pequenos hábitos mudam a sua disposição diária.',
                    youtubeId: 'XSrh2prRRa4'
                }
            ]
        }
    };

    // 2. Lê a URL para saber em qual categoria a pessoa clicou
    const urlParams = new URLSearchParams(window.location.search);
    const categoriaEscolhida = urlParams.get('categoria');

    // Elementos da tela que vamos modificar
    const elTituloPagina = document.getElementById('titulo-pagina');
    const elTituloHeader = document.getElementById('titulo-header');
    const elTituloSecao = document.getElementById('titulo-secao');
    const elDescricao = document.getElementById('descricao-secao');
    const elContainer = document.getElementById('container-videos');

    // 3. Monta a Tela de acordo com a Categoria
    if (categoriaEscolhida && bancoDeVideos[categoriaEscolhida]) {
        const dadosCategoria = bancoDeVideos[categoriaEscolhida];
        
        // Atualiza os textos da tela
        elTituloPagina.textContent = `SOS UFU - ${dadosCategoria.titulo}`;
        elTituloHeader.textContent = dadosCategoria.titulo;
        elTituloSecao.textContent = dadosCategoria.titulo;
        elDescricao.textContent = dadosCategoria.descricao;

        elContainer.innerHTML = '';

        dadosCategoria.videos.forEach(video => {
            const htmlDoCard = `
                <article class="card-video">
                    <h4>${video.titulo}</h4>
                    <p>${video.descricao}</p>
                    <div class="video-wrapper">
                        <iframe src="https://www.youtube.com/embed/${video.youtubeId}" allowfullscreen></iframe>
                    </div>
                </article>
            `;
            elContainer.innerHTML += htmlDoCard;
        });

    } else {
        elTituloHeader.textContent = 'Erro';
        elTituloSecao.textContent = 'Categoria não encontrada';
        elDescricao.textContent = 'Volte para a tela anterior e tente novamente.';
        elContainer.innerHTML = '<p style="text-align:center;">Nenhum conteúdo disponível.</p>';
    }
    
    const btnEmergenciaNav = document.getElementById('btn-emergencia-nav');
    if (btnEmergenciaNav) {
        btnEmergenciaNav.addEventListener('click', () => {
            if(confirm('Você será direcionado para o CVV (188). Deseja continuar?')) {
                window.location.href = 'tel:188'; 
            }
        });
    }
});