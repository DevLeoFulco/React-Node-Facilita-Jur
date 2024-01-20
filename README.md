# Projeto de Cadastro de Clientes

Este projeto é uma aplicação web para cadastrar e gerenciar clientes. Ele foi desenvolvido usando React para o frontend e Node.js com Express para o backend, além de um banco de dados PostgreSQL para armazenar os dados dos clientes.

## Versões das Ferramentas Utilizadas

- Node.js: v20.10
- npm: v9.8.1
- React: v17+

## Rodando o Projeto Localmente

Siga as instruções abaixo para rodar a solução localmente:

### Backend

1. Certifique-se de ter o Node.js e o npm instalados na sua máquina.

2. Abra o terminal na pasta do projeto.

3. Navegue até a pasta `backend`:

    ```bash
    cd backend
    ```

4. Instale as dependências do backend:

    ```bash
    npm install
    ```

5. Renomeie o arquivo `.env.example` para `.env` e configure as variáveis de ambiente, como a conexão com o banco de dados.

6. Execute o backend:

    ```bash
    npm start
    ```

   O servidor backend será iniciado na porta 3001 por padrão.

### Banco de Dados

1. Crie um banco de dados PostgreSQL com o nome desejado.

2. Utilize o DDL abaixo para criar a tabela `clientes` no banco de dados:

    ```sql
    CREATE TABLE clientes (
      id SERIAL PRIMARY KEY,
      nome VARCHAR(255) NOT NULL,
      email VARCHAR(255) NOT NULL,
      telefone VARCHAR(20) NOT NULL,
      coordenadaX FLOAT NOT NULL,
      coordenadaY FLOAT NOT NULL
    );
    ```

### Frontend

1. Abra outro terminal na pasta do projeto (ou navegue de volta para a raiz do projeto).

2. Navegue até a pasta `frontend`:

    ```bash
    cd frontend
    ```

3. Instale as dependências do frontend:

    ```bash
    npm install
    ```

4. Execute o frontend:

    ```bash
    npm start
    ```

   O aplicativo React será iniciado e estará acessível em [http://localhost:3000](http://localhost:3000).

Agora, você pode acessar o aplicativo no seu navegador e começar a cadastrar e gerenciar clientes localmente!

Lembre-se de que essas instruções assumem que você tem um ambiente de desenvolvimento configurado e um servidor PostgreSQL em execução. Certifique-se de ajustar as configurações de acordo com o seu ambiente específico.
