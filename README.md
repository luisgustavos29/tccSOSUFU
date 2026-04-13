# SOS UFU 🧠 - Plataforma de Suporte Psicológico Universitário

Este repositório contém o Produto Mínimo Viável (MVP) do **SOS UFU**, uma plataforma digital desenvolvida como meu Trabalho de Conclusão de Curso (TCC) em Sistemas de Informação. O objetivo é facilitar e desburocratizar o acesso de estudantes a atendimento psicológico voluntário e a conteúdos de bem-estar.

---

## 🛠️ Tecnologias Utilizadas

- **Frontend:** HTML5, CSS3 (Arquitetura *Mobile-First*, Vanilla CSS), JavaScript.
- **Backend:** Node.js, Express.js.
- **Banco de Dados:** MySQL.
- **Segurança & ORM:** JWT (JSON Web Tokens), Bcrypt.js, Sequelize.

---

## ⚙️ Pré-requisitos

Para rodar esta aplicação localmente, certifique-se de ter instalado em sua máquina:
1. [Node.js](https://nodejs.org/) (Versão 14 ou superior)
2. [MySQL](https://www.mysql.com/) (Servidor rodando localmente)
3. Extensão **Live Server** no VS Code (ou servidor estático similar).

---

## 🚀 Passo a Passo para Execução

### 1. Configurando o Banco de Dados
O sistema já conta com um script contendo a estrutura das tabelas e dados simulados (Mock Data) para testes imediatos.
1. Abra o seu gerenciador de banco de dados (ex: **MySQL Workbench**).
2. Abra o arquivo `sos_ufu.sql` que se encontra dentro da pasta `database/`.
3. Execute o script completo (ele criará o banco `sos_ufu`, as tabelas e inserirá os usuários e grades de horários de teste automaticamente).

### 2. Configurando o Servidor (Backend)
1. Abra um terminal e navegue até a pasta do backend:
   ```bash
   cd backend
2. Instale todas as dependências necessárias:
   ```bash
   npm install
3. Na raiz da pasta backend, crie um arquivo chamado .env. Copie o conteúdo do arquivo .env.example para dentro do seu novo .env e preencha com as credenciais do seu banco de dados MySQL local. Exemplo:
   ```Snippet de código
   DB_HOST=localhost
   DB_USER=root
   DB_PASS=sua_senha_aqui
   DB_NAME=sos_ufu
   PORT=3000
   ```
4. Inicie o servidor:
   ```bash
   npm run dev
### 3. Executando a Interface (Frontend)

1. Navegue até o diretório `frontend/`.
2. Abra o arquivo `index.html` no seu editor de código.
3. Inicie a aplicação clicando em **"Go Live"** (referente à extensão *Live Server*) no rodapé do VS Code, ou clique com o botão direito no código e selecione **"Open with Live Server"**.

> 💡 **Nota:** A aplicação será aberta automaticamente no seu navegador padrão.

---

👨‍💻 Desenvolvido por [Luís Gustavo](https://github.com/luisgustavos29)

