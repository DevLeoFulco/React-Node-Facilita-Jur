const { Pool } = require('pg');
//configuração de conexão com o banco de dados
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'gerenciamento_clientes',
  password: 'admin',
  port: 5432,
});

module.exports = pool;
