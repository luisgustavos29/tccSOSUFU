/* ==========================================
Lógica de Cadastro e Login
========================================== */

document.addEventListener('DOMContentLoaded', () => {
    const formCadastro = document.getElementById('form-cadastro');
    
    // Elementos de feedback visual (Cadastro)
    const msgErro = document.getElementById('msg-erro');
    const msgSucesso = document.getElementById('msg-sucesso');
    const btnCadastrar = document.getElementById('btn-cadastrar');

    const botoesToggle = document.querySelectorAll('.btn-toggle-pass, .icone-olho');
    botoesToggle.forEach(btn => {
        btn.addEventListener('click', (e) => {
            const container = e.target.parentElement;
            const inputSenha = container.querySelector('input');
            
            if (inputSenha) {
                const type = inputSenha.getAttribute('type') === 'password' ? 'text' : 'password';
                inputSenha.setAttribute('type', type);
                e.target.textContent = type === 'password' ? 'visibility_off' : 'visibility';
            }
        });
    });

    if (formCadastro) {
        formCadastro.addEventListener('submit', async (e) => {
            e.preventDefault(); 
            
            if(msgErro) msgErro.style.display = 'none';
            if(msgSucesso) msgSucesso.style.display = 'none';
            if(btnCadastrar) btnCadastrar.disabled = true; 
            
            const nome = document.getElementById('nome').value;
            const email = document.getElementById('email').value;
            const matricula_ufu = document.getElementById('matricula').value; 
            const senha = document.getElementById('senha').value;

            const dadosUsuario = { nome, email, matricula_ufu, senha };

            try {
                // Passo A: Criar a conta no banco
                const response = await fetch('http://localhost:3000/auth/cadastro', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(dadosUsuario)
                });

                const resultado = await response.json();

                if (response.ok) {
                    if(msgSucesso) {
                        msgSucesso.textContent = 'Conta criada com sucesso!';
                        msgSucesso.style.display = 'block';
                    }

                    // Passo B: Login Silencioso (Auto-login)
                    const loginResponse = await fetch('http://localhost:3000/auth/login', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ email, senha }) 
                    });

                    if (loginResponse.ok) {
                        const dadosLogin = await loginResponse.json();
                        
                        localStorage.setItem('token_sos_ufu', dadosLogin.token);
                        localStorage.setItem('usuario_nome', dadosLogin.estudante.nome);

                        setTimeout(() => {
                            window.location.href = 'dashboard.html';
                        }, 1500);
                    } else {
                        window.location.href = 'index.html';
                    }

                } else {
                    if(btnCadastrar) btnCadastrar.disabled = false;
                    if(msgErro) {
                        msgErro.textContent = resultado.erro || 'Erro ao criar conta.';
                        msgErro.style.display = 'block';
                    }
                }

            } catch (error) {
                console.error('Erro na requisição:', error);
                if(btnCadastrar) btnCadastrar.disabled = false;
                if(msgErro) {
                    msgErro.textContent = 'Não foi possível conectar ao servidor.';
                    msgErro.style.display = 'block';
                }
            }
        });
    }

   
    const formLogin = document.getElementById('form-login');
    
    if (formLogin) {
        formLogin.addEventListener('submit', async (e) => {
            e.preventDefault(); 
            
            const email = document.getElementById('email').value;
            const senha = document.getElementById('senha').value;
            const msgErroLogin = document.getElementById('mensagem-erro');
            const btnLogin = document.getElementById('btn-entrar');

            
            if(msgErroLogin) msgErroLogin.style.display = 'none';
            if(btnLogin) btnLogin.disabled = true;

            try {
                // Bate na rota de login da API
                const response = await fetch('http://localhost:3000/auth/login', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ email, senha })
                });

                const resultado = await response.json();

                if (response.ok) {
                    // Guarda o crachá e manda pro Dashboard
                    localStorage.setItem('token_sos_ufu', resultado.token);
                    localStorage.setItem('usuario_nome', resultado.estudante.nome);
                    window.location.href = 'dashboard.html';
                } else {
                    // Feedback de UX: Mostra a mensagem vermelha
                    if(msgErroLogin) {
                        msgErroLogin.textContent = resultado.erro || 'E-mail ou senha incorretos.';
                        msgErroLogin.style.display = 'block';
                    }
                    if(btnLogin) btnLogin.disabled = false; 
                }

            } catch (error) {
                console.error('Erro no login:', error);
                if(msgErroLogin) {
                    msgErroLogin.textContent = 'Erro ao conectar com o servidor.';
                    msgErroLogin.style.display = 'block';
                }
                if(btnLogin) btnLogin.disabled = false;
            }
        });
    }
});