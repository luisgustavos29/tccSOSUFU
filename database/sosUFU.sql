-- =======================================================
-- 1. RESET TOTAL DO BANCO DE DADOS
-- =======================================================
DROP DATABASE IF EXISTS sos_ufu;
CREATE DATABASE sos_ufu;
USE sos_ufu;

-- =======================================================
-- 2. CRIAÇÃO DAS TABELAS (ESTRUTURA)
-- =======================================================

CREATE TABLE estudantes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    senha_hash VARCHAR(255) NOT NULL, 
    matricula_ufu VARCHAR(20) NOT NULL UNIQUE, 
    data_cadastro DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE psicologos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    senha_hash VARCHAR(255) NOT NULL,
    crp VARCHAR(20) NOT NULL UNIQUE, 
    abordagem VARCHAR(50), 
    url_foto VARCHAR(255), 
    descricao TEXT, 
    data_cadastro DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE disponibilidade (
    id INT AUTO_INCREMENT PRIMARY KEY,
    dia_semana VARCHAR(20) NOT NULL, 
    hora_inicio TIME NOT NULL,        
    hora_fim TIME NOT NULL,            
    psicologo_id INT NOT NULL,
    FOREIGN KEY (psicologo_id) REFERENCES psicologos(id) ON DELETE CASCADE
);

CREATE TABLE agendamentos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    data_hora DATETIME NOT NULL,
    status VARCHAR(20) DEFAULT 'Pendente', 
    link_reuniao VARCHAR(255),
    estudante_id INT NOT NULL,
    psicologo_id INT NOT NULL,
    id_disponibilidade INT NOT NULL, -- Coluna essencial para a trava de horário
    FOREIGN KEY (estudante_id) REFERENCES estudantes(id),
    FOREIGN KEY (psicologo_id) REFERENCES psicologos(id),
    FOREIGN KEY (id_disponibilidade) REFERENCES disponibilidade(id)
);

CREATE TABLE conteudos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    titulo VARCHAR(100) NOT NULL,
    texto_conteudo TEXT NOT NULL,
    categoria VARCHAR(50),
    url_video VARCHAR(255),
    data_cadastro DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- =======================================================
-- 3. INSERÇÃO DOS DADOS DE TESTE (MOCK DATA)
-- =======================================================

-- Inserindo o Estudante
INSERT INTO estudantes (nome, email, senha_hash, matricula_ufu) VALUES
('Luís Gustavo', 'luis@ufu.br', 'hash_falso_123', '11911BCC025');

-- Inserindo os 5 Psicólogos do Time
INSERT INTO psicologos (nome, email, senha_hash, crp, abordagem, url_foto, descricao) VALUES
('Dra. Ana Souza', 'ana@sosufu.br', 'hash_123', 'CRP 04/12345', 'TCC', 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=150&h=150', 'Especialista em ansiedade acadêmica e transição universitária.'),
('Dr. Marcos Silva', 'marcos@sosufu.br', 'hash_123', 'CRP 04/98765', 'Psicanálise', 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&w=150&h=150', 'Foco no autoconhecimento e auxílio no manejo de crises de estresse.'),
('Dra. Beatriz Lima', 'beatriz@sosufu.br', 'hash_123', 'CRP 04/55555', 'Gestalt-terapia', 'https://randomuser.me/api/portraits/women/65.jpg', 'Foco em relacionamentos interpessoais e adaptação à vida acadêmica.'),
('Dr. Carlos Mendes', 'carlos@sosufu.br', 'hash_123', 'CRP 04/44444', 'Humanista', 'https://randomuser.me/api/portraits/men/46.jpg', 'Foco em luto, escolhas de carreira e autoestima.'),
('Dra. Fernanda Costa', 'fernanda@sosufu.br', 'hash_123', 'CRP 04/33333', 'Sistêmica', 'https://randomuser.me/api/portraits/women/17.jpg', 'Foco em conflitos familiares e pressões externas.');

-- =======================================================
-- Inserindo Grade de Horários PADRONIZADA (Seg a Sex, 13h às 17h)
-- =======================================================
INSERT INTO disponibilidade (dia_semana, hora_inicio, hora_fim, psicologo_id) VALUES
-- Psicólogo 1 (Dra. Ana Souza)
('Segunda-feira', '13:00:00', '14:00:00', 1), ('Segunda-feira', '14:00:00', '15:00:00', 1), ('Segunda-feira', '15:00:00', '16:00:00', 1), ('Segunda-feira', '16:00:00', '17:00:00', 1),
('Terça-feira', '13:00:00', '14:00:00', 1), ('Terça-feira', '14:00:00', '15:00:00', 1), ('Terça-feira', '15:00:00', '16:00:00', 1), ('Terça-feira', '16:00:00', '17:00:00', 1),
('Quarta-feira', '13:00:00', '14:00:00', 1), ('Quarta-feira', '14:00:00', '15:00:00', 1), ('Quarta-feira', '15:00:00', '16:00:00', 1), ('Quarta-feira', '16:00:00', '17:00:00', 1),
('Quinta-feira', '13:00:00', '14:00:00', 1), ('Quinta-feira', '14:00:00', '15:00:00', 1), ('Quinta-feira', '15:00:00', '16:00:00', 1), ('Quinta-feira', '16:00:00', '17:00:00', 1),
('Sexta-feira', '13:00:00', '14:00:00', 1), ('Sexta-feira', '14:00:00', '15:00:00', 1), ('Sexta-feira', '15:00:00', '16:00:00', 1), ('Sexta-feira', '16:00:00', '17:00:00', 1),

-- Psicólogo 2 (Dr. Marcos Silva)
('Segunda-feira', '13:00:00', '14:00:00', 2), ('Segunda-feira', '14:00:00', '15:00:00', 2), ('Segunda-feira', '15:00:00', '16:00:00', 2), ('Segunda-feira', '16:00:00', '17:00:00', 2),
('Terça-feira', '13:00:00', '14:00:00', 2), ('Terça-feira', '14:00:00', '15:00:00', 2), ('Terça-feira', '15:00:00', '16:00:00', 2), ('Terça-feira', '16:00:00', '17:00:00', 2),
('Quarta-feira', '13:00:00', '14:00:00', 2), ('Quarta-feira', '14:00:00', '15:00:00', 2), ('Quarta-feira', '15:00:00', '16:00:00', 2), ('Quarta-feira', '16:00:00', '17:00:00', 2),
('Quinta-feira', '13:00:00', '14:00:00', 2), ('Quinta-feira', '14:00:00', '15:00:00', 2), ('Quinta-feira', '15:00:00', '16:00:00', 2), ('Quinta-feira', '16:00:00', '17:00:00', 2),
('Sexta-feira', '13:00:00', '14:00:00', 2), ('Sexta-feira', '14:00:00', '15:00:00', 2), ('Sexta-feira', '15:00:00', '16:00:00', 2), ('Sexta-feira', '16:00:00', '17:00:00', 2),

-- Psicólogo 3 (Dra. Beatriz Lima)
('Segunda-feira', '13:00:00', '14:00:00', 3), ('Segunda-feira', '14:00:00', '15:00:00', 3), ('Segunda-feira', '15:00:00', '16:00:00', 3), ('Segunda-feira', '16:00:00', '17:00:00', 3),
('Terça-feira', '13:00:00', '14:00:00', 3), ('Terça-feira', '14:00:00', '15:00:00', 3), ('Terça-feira', '15:00:00', '16:00:00', 3), ('Terça-feira', '16:00:00', '17:00:00', 3),
('Quarta-feira', '13:00:00', '14:00:00', 3), ('Quarta-feira', '14:00:00', '15:00:00', 3), ('Quarta-feira', '15:00:00', '16:00:00', 3), ('Quarta-feira', '16:00:00', '17:00:00', 3),
('Quinta-feira', '13:00:00', '14:00:00', 3), ('Quinta-feira', '14:00:00', '15:00:00', 3), ('Quinta-feira', '15:00:00', '16:00:00', 3), ('Quinta-feira', '16:00:00', '17:00:00', 3),
('Sexta-feira', '13:00:00', '14:00:00', 3), ('Sexta-feira', '14:00:00', '15:00:00', 3), ('Sexta-feira', '15:00:00', '16:00:00', 3), ('Sexta-feira', '16:00:00', '17:00:00', 3),

-- Psicólogo 4 (Dr. Carlos Mendes)
('Segunda-feira', '13:00:00', '14:00:00', 4), ('Segunda-feira', '14:00:00', '15:00:00', 4), ('Segunda-feira', '15:00:00', '16:00:00', 4), ('Segunda-feira', '16:00:00', '17:00:00', 4),
('Terça-feira', '13:00:00', '14:00:00', 4), ('Terça-feira', '14:00:00', '15:00:00', 4), ('Terça-feira', '15:00:00', '16:00:00', 4), ('Terça-feira', '16:00:00', '17:00:00', 4),
('Quarta-feira', '13:00:00', '14:00:00', 4), ('Quarta-feira', '14:00:00', '15:00:00', 4), ('Quarta-feira', '15:00:00', '16:00:00', 4), ('Quarta-feira', '16:00:00', '17:00:00', 4),
('Quinta-feira', '13:00:00', '14:00:00', 4), ('Quinta-feira', '14:00:00', '15:00:00', 4), ('Quinta-feira', '15:00:00', '16:00:00', 4), ('Quinta-feira', '16:00:00', '17:00:00', 4),
('Sexta-feira', '13:00:00', '14:00:00', 4), ('Sexta-feira', '14:00:00', '15:00:00', 4), ('Sexta-feira', '15:00:00', '16:00:00', 4), ('Sexta-feira', '16:00:00', '17:00:00', 4),

-- Psicólogo 5 (Dra. Fernanda Costa)
('Segunda-feira', '13:00:00', '14:00:00', 5), ('Segunda-feira', '14:00:00', '15:00:00', 5), ('Segunda-feira', '15:00:00', '16:00:00', 5), ('Segunda-feira', '16:00:00', '17:00:00', 5),
('Terça-feira', '13:00:00', '14:00:00', 5), ('Terça-feira', '14:00:00', '15:00:00', 5), ('Terça-feira', '15:00:00', '16:00:00', 5), ('Terça-feira', '16:00:00', '17:00:00', 5),
('Quarta-feira', '13:00:00', '14:00:00', 5), ('Quarta-feira', '14:00:00', '15:00:00', 5), ('Quarta-feira', '15:00:00', '16:00:00', 5), ('Quarta-feira', '16:00:00', '17:00:00', 5),
('Quinta-feira', '13:00:00', '14:00:00', 5), ('Quinta-feira', '14:00:00', '15:00:00', 5), ('Quinta-feira', '15:00:00', '16:00:00', 5), ('Quinta-feira', '16:00:00', '17:00:00', 5),
('Sexta-feira', '13:00:00', '14:00:00', 5), ('Sexta-feira', '14:00:00', '15:00:00', 5), ('Sexta-feira', '15:00:00', '16:00:00', 5), ('Sexta-feira', '16:00:00', '17:00:00', 5);