# Code Burger (Next.js)

Este é um projeto acadêmico de uma aplicação web fullstack para uma hamburgueria virtual. O objetivo foi construir um novo frontend utilizando **Next.js** e **Tailwind CSS** para consumir uma API backend existente feita em **Python (Flask)** e **Docker**.

## Este projeto é dividido em duas partes principais que rodam de forma independente:

* **Frontend (Este repositório):**
    * **Next.js:** Framework React para renderização e gerenciamento de páginas.
    * **React (useState, useEffect):** Para gerenciamento de estado e interatividade.
    * **Tailwind CSS:** Para estilização moderna e responsiva (mobile-first).
    * **JavaScript (ES6+):** Para a lógica do lado do cliente (carrinho, localStorage).

* **Backend (Pasta `/backend`):**
    * **Python:** Linguagem principal da API.
    * **Flask:** Micro-framework para a criação da API RESTful.
    * **SQLAlchemy:** ORM para comunicação com o banco de dados.
    * **MySQL:** Banco de dados relacional.
    * **Docker / Docker Compose:** Para containerizar e orquestrar a API e o banco de dados.

## Funcionalidades

* Visualização do cardápio de lanches (consumido da API).
* Seleção de um lanche para personalização.
* Adição e remoção de ingredientes "adicionais".
* Cálculo de preço dinâmico com base nos adicionais.
* Adição de lanches personalizados ao carrinho (persistido no `localStorage`).
* Visualização da página de Carrinho com o total do pedido.
* Páginas de Login e Cadastro (layout estático).

<br>


Para executar este projeto, você precisará ter **Git**, **Node.js (v18+)** e **Docker Desktop** instalados na sua máquina.

Siga os passos abaixo na ordem correta, pois o frontend depende do backend estar no ar.

# 1. Clonar o Repositório

```bash
git clone [https://github.com/pablobmm/projeto-hamburgueria-next.git](https://github.com/pablobmm/projeto-hamburgueria-next.git)
cd projeto-hamburgueria-next
``` 

# Iniciar o Backend (Docker)
O backend (API em Python e Banco de Dados MySQL) roda inteiramente dentro de contêineres Docker.

Abra um terminal e execute os seguintes comandos de dentro da pasta backend
## 1. Entre na pasta do backend
cd backend
## 2. Suba os serviços (API + Banco de Dados)
docker-compose up -d --build
## 3. Rode o script que popula o banco de dados
docker-compose run --rm api python -m apps.init_db
# 4. Iniciar o Frontend (Next.js)
Agora, abra um novo terminal (mantenha o terminal do Docker rodando).
Neste novo terminal, execute os comandos para iniciar o site:
## 1. Entre na pasta do frontend
cd frontend

## 2. Instale as dependências (apenas na primeira vez)
npm install

## 3. Inicie o servidor de desenvolvimento
npm run dev

# 5. Acessar o Projeto
Pronto! O servidor do frontend estará rodando.
Basta abrir o seu navegador e acessar: http://localhost:3000
