// Importando o objeto DataTypes do Sequelize, que fornece tipos de dados para definir os campos da tabela
const { DataTypes } = require('sequelize');

// Definindo o modelo 'Cliente' que será usado para interagir com a tabela correspondente no banco de dados
const Cliente = sequelize.define('Cliente', {
  // Definindo o campo 'nome' com tipo STRING e restrição de não nulo (allowNull: false)
  nome: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  // Definindo o campo 'email' com tipo STRING e restrição de não nulo
  email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  // Definindo o campo 'telefone' com tipo STRING e restrição de não nulo
  telefone: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  // Definindo o campo 'coordenadaX' com tipo FLOAT e restrição de não nulo
  coordenadaX: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  // Definindo o campo 'coordenadaY' com tipo FLOAT e restrição de não nulo
  coordenadaY: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
});

// Exportando o modelo Cliente para que possa ser utilizado em outras partes do código
module.exports = Cliente;


  