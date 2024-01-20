const pool = require("../config/database");

module.exports = {
  //lista os clientes cadastrados no banco de dados.
  async listarClientes(req, res) {
    try {
      const result = await pool.query("SELECT * FROM clientes");
      res.json(result.rows);
    } catch (error) {
      console.error("Erro ao listar clientes:", error);
      res.status(500).json({ error: "Erro interno do servidor" });
    }
  },
  //faz um filtro de clientes atraves dos parametros de cadastro
  async filtrarClientes(req, res) {
    const { termo } = req.query;
    try {
      const result = await pool.query(
        "SELECT * FROM clientes WHERE nome ILIKE $1 OR email ILIKE $1 OR telefone ILIKE $1",
        [`%${termo}%`]
      );
      res.json(result.rows);
    } catch (error) {
      console.error("Erro ao filtrar clientes:", error);
      res.status(500).json({ error: "Erro interno do servidor" });
    }
  },
  //cadastrar clientes.
  //função responsável por cadastrar um novo cliente.
  //recebe os dados do formulário e cria um novo cliente no banco de dados.

  async cadastrarCliente(req, res) {
    const { nome, email, telefone, coordenadaX, coordenadaY } = req.body;
    try {
      const cliente = await Cliente.create({
        nome,
        email,
        telefone,
        coordenadaX,
        coordenadaY,
      });
  
      res.status(201).json(cliente);
    } catch (error) {
      console.error("Erro ao cadastrar cliente:", error);
      res.status(500).json({ error: "Erro interno do servidor" });
    }
  },
  
  //função para editar clientes pelo ID.
  async editarClientes(req, res) {
    const { id } = req.params;
    const { nome, email, telefone } = req.body;
    try {
      const result = await pool.query(
        "UPDATE clientes SET nome=$1, email=$2, telefone=$3 WHERE id=$4 RETURNING *",
        [nome, email, telefone, id]
      );
      if (result.rows.length === 0) {
        res.status(404).json({ error: "Cliente não encontrado" });
      } else {
        res.json(result.rows[0]);
      }
    } catch (error) {
      console.error("Erro ao editar cliente:", error);
      res.status(500).json({ error: "Erro interno do servidor" });
    }
  },
  //função responsável por excluir um cliente pelo ID.
  async deletarClientes(req, res) {
    const { id } = req.params;
    try {
      const result = await pool.query(
        "DELETE FROM clientes WHERE id=$1 RETURNING *",
        [id]
      );
      if (result.rows.length === 0) {
        res.status(404).json({ error: "Cliente não encontrado" });
      } else {
        res.json({ message: "Cliente excluído com sucesso" });
      }
    } catch (error) {
      console.error("Erro ao excluir cliente:", error);
      res.status(500).json({ error: "Erro interno do servidor" });
    }
  },
};
