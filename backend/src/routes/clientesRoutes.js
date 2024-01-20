const express = require("express");
const router = express.Router();
const clientesController = require("../controllers/clientesController");

// Rotas
router.get("/", clientesController.listarClientes);
router.get("/filtrar", clientesController.filtrarClientes);
router.post("/cadastrar", clientesController.cadastrarCliente);
router.put("/editar/:id", clientesController.editarClientes);
router.delete("/deletar/:id", clientesController.deletarClientes);
module.exports = router;

//metodo para cadastrar cliente
const Cliente = require('../models/cliente');

exports.cadastrarCliente = async (req, res) => {
  const { nome, email, telefone, coordX, coordY } = req.body;

  try {
    const cliente = await Cliente.create({
      nome,
      email,
      telefone,
      coordenadaX: coordX,
      coordenadaY: coordY,
    });

    res.status(201).json(cliente);
  } catch (error) {
    console.error('Erro ao cadastrar cliente:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
};
//função para listar os clientes
exports.listarClientes = async (req, res) => {
  try {
    const clientes = await Cliente.findAll();
    res.json(clientes);
  } catch (error) {
    console.error('Erro ao listar clientes:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
};