// Importações necessárias
import GlobalStyle from "./Style/global.js";
import styled from "styled-components";
import Form from "./components/Form.js";
import Grid from "./components/Grid.js";
import { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

// Estilo do componente de contêiner principal
const Container = styled.div`
  width: 100%;
  max-width: 800px;
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
`;

// Estilo do título
const Title = styled.h2``;

// Componente principal da aplicação
function App() {
  // Estado para armazenar a lista de usuários
  const [users, setUser] = useState([]);
  // Estado para controlar a edição de um usuário
  const [onEdit, setOnEdit] = useState(null);

  // Função para obter a lista de usuários do servidor
  const getUser = async () => {
    try {
      const res = await axios.get("http://localhost:3001/clientes");
      // Ordena os usuários pelo nome
      setUser(res.data.sort((a, b) => (a.nome > b.nome ? 1 : -1)));
    } catch (error) {
      toast.error(error);
    }
  };

  // Função para lidar com a adição de um novo cliente
  const handleAdd = async (formData) => {
    try {
      const res = await axios.post(
        "http://localhost:3001/clientes/cadastrar",
        formData
      );
      toast.success("Cliente cadastrado com sucesso");
      // Atualiza a lista de usuários após a adição
      getUser();
    } catch (error) {
      console.error("Erro ao cadastrar cliente:", error);
      toast.error("Erro ao cadastrar cliente");
    }
  };

  // Função para lidar com a atualização de um usuário
  const handleUpdateUser = async (updatedUser) => {
    try {
      // Envia a requisição para atualizar o usuário no servidor
      await axios.put(
        `http://localhost:3001/clientes/editar/${updatedUser.id}`,
        updatedUser
      );
      toast.success("Cliente atualizado com sucesso");
      // Atualiza a lista de usuários após a edição
      getUser();
      // Limpa o estado de edição
      setOnEdit(null);
    } catch (error) {
      console.error("Erro ao editar cliente:", error);
      toast.error("Erro ao editar cliente");
    }
  };

  // Efeito para carregar a lista de usuários ao montar o componente
  useEffect(() => {
    getUser();
  }, [setUser]);

  // Componente principal renderizado
  return (
    <>
      <Container>
        {/* Título da aplicação */}
        <Title>Clientes</Title>
        {/* Componente de formulário para adição e edição de clientes */}
        <Form
          onAdd={handleAdd}
          onUpdateUser={handleUpdateUser}
          editingUser={onEdit}
        />
        {/* Componente de grade para exibição da lista de clientes */}
        <Grid users={users} setUsers={setUser} setOnEdit={setOnEdit} />
      </Container>
      {/* Componente de notificações toasts */}
      <ToastContainer autoClose={3000} position="bottom-left" />
      {/* Estilos globais da aplicação */}
      <GlobalStyle />
    </>
  );
}

export default App;
