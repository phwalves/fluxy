# Fluxy - Gestão Financeira Inteligente

Rpositório **Fluxy**, uma aplicação Fullstack de gestão financeira desenvolvida para o **Capítulo 14 (Fase 7)**. O objetivo deste MVP é permitir ao usuário o controle de receitas, despesas e o acompanhamento de metas financeiras.

## Tecnologias Utilizadas

**Front-end:**
* ReactJS (com Vite)
* Tailwind CSS (Estilização e Responsividade)
* Axios (Consumo de API)
* React Router Dom (Navegação)

**Back-end:**
* Java 17+
* Spring Boot (Web, Data JPA)
* Banco de Dados: Oracle com instância da FIAP

## Estrutura do Projeto

* `/fluxy-front`: Contém todo o código da interface de utilizador (React).
* `/src`: Contém a API RESTful em Java (Spring Boot) dividida em Models, Repositories, Services e Controllers.
* `DDL_FINTECH.sql`: Script completo para a criação das tabelas, sequences e carga inicial de dados.

## Como Executar o Projeto


### 1. Back-end (Spring Boot)
1. Importe o projeto na sua IDE.
2. Verifique o ficheiro `application.properties` e ajuste as credenciais do banco de dados Oracle, se necessário.
3. Inicie a aplicação executando a classe `FluxyApplication.java` (A API rodará na porta `8080`).

### 2. Front-end (React)
1. Abra o terminal na pasta `/fluxy-front`.
2. Instale as dependências: `npm install`
3. Inicie o servidor de desenvolvimento: `npm run dev`
4. A aplicação abrirá no navegador (geralmente na porta `5173`).

## Credenciais de Teste
Utilize os dados abaixo para fazer o login no sistema:
* **E-mail:** usuario@fluxy.com
* **Senha:** fluxy123