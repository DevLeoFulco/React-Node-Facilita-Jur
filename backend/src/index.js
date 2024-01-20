const express = require('express');
const cors = require('cors'); 

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware para aceitar JSON no corpo das requisições
app.use(express.json());
app.use(cors()); // aqui vem a configuração do middleware para aceitar requisições de outros domínios com o método POST e o método PUT, mas não aceitar requisições de outros domínios com o método DELETE e CORS

// Rotas
const clientesRoutes = require('./routes/clientesRoutes');
app.use('/clientes', clientesRoutes);

// Inicialização do servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
