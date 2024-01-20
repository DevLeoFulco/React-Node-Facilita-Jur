import axios from 'axios';

const API_BASE_URL = 'http://localhost:3001';

export const cadastrarCliente = async (formData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/clientes/cadastrar`, formData);
    return response.data;
  } catch (error) {
    console.error('Erro ao cadastrar cliente:', error);
    throw error;
  }
};

export const listarClientes = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/clientes`);
    return response.data;
  } catch (error) {
    console.error('Erro ao listar clientes:', error);
    throw error;
  }
};
