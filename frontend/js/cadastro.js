
document.addEventListener('DOMContentLoaded', () => {
    const formCadastro = document.getElementById('form-cadastro');
    const inputNome = document.getElementById('nome');
    const inputEmail = document.getElementById('email');
    const inputSenha = document.getElementById('senha');
    const divErro = document.getElementById('mensagem-erro');
    const divSucesso = document.getElementById('mensagem-sucesso');
    const btnCadastrar = document.getElementById('btn-cadastrar');
    const toggleSenha = document.getElementById('toggle-senha');

    toggleSenha.addEventListener('click', () => {
        const tipoAtual = inputSenha.getAttribute('type');
        if (tipoAtual === 'password') {
            inputSenha.setAttribute('type', 'text');
            toggleSenha.textContent = 'visibility_off'; 
        } else {
            inputSenha.setAttribute('type', 'password');
            toggleSenha.textContent = 'visibility'; 
        }
    });

    formCadastro.addEventListener('submit', async (evento) => {
        evento.preventDefault(); 
        divErro.classList.add('oculto');
        divSucesso.classList.add('oculto');
        btnCadastrar.textContent = 'Cadastrando...';
        btnCadastrar.disabled = true;

        const dadosCadastro = {
            nome: inputNome.value,
            email: inputEmail.value,
            senha: inputSenha.value
        };

        try {
            const resposta = await fetch(`${API_BASE_URL}/auth/cadastro`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(dadosCadastro)
            });

            const dados = await resposta.json();

            if (resposta.ok || resposta.status === 201) {
                divSucesso.textContent = 'Conta criada com sucesso! Redirecionando...';
                divSucesso.classList.remove('oculto');
                setTimeout(() => { window.location.href = 'index.html'; }, 2000);
            } else {
                divErro.textContent = dados.erro || 'Erro ao criar conta. Tente novamente.';
                divErro.classList.remove('oculto');
                btnCadastrar.textContent = 'Cadastrar';
                btnCadastrar.disabled = false;
            }
        } catch (erro) {
            console.error('Erro de conexão:', erro);
            divErro.textContent = 'Não foi possível conectar ao servidor.';
            divErro.classList.remove('oculto');
            btnCadastrar.textContent = 'Cadastrar';
            btnCadastrar.disabled = false;
        }
    });
});
