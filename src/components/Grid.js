import React, { useState } from "react";
import styled from "styled-components";
import { FaTrash, FaEdit } from "react-icons/fa";
import { toast } from "react-toastify";
import axios from "axios";

// Definindo o estilo da tabela
const Table = styled.table`
  width: 100%;
  background-color: #fff;
  padding: 50px;
  box-shadow: 0px 0px 5px #ccc;
  border-radius: 5px;
  max-width: 900px;
  margin: 20px auto;
  word-break: break-all;
`;

// Definindo o estilo do corpo da tabela
export const Tbody = styled.tbody``;

// Definindo o estilo do cabeçalho da tabela
export const Thead = styled.thead``;

// Definindo o estilo da linha da tabela
export const Tr = styled.tr``;

// Definindo o estilo das células do cabeçalho da tabela
export const Th = styled.th`
  text-align: start;
  border-bottom: inset;
  padding-bottom: 5px;
  // Se o dispositivo for mobile, a coluna é ocultada
  @media (max-width: 500px) {
    ${(props) => props.onlyWeb && "display:none"}
  }
`;

// Definindo o estilo das células do corpo da tabela
export const Td = styled.td`
  padding-top: 15px;
  text-align: ${(props) =>
    props.alignCenter
      ? "center"
      : "start"}; // Ajustando a posição do texto no centro ou no início
  width: ${(props) =>
    props.width
      ? props.width
      : "auto"}; // Ajustando a largura da célula ou usando o tamanho automático

  @media (max-width: 500px) {
    ${(props) =>
      props.onlyWeb &&
      "display:none"} // Quando o dispositivo for de dimensões menores que 500px, a célula fica invisível na tela
  }
`;

// Componente de grid para exibição e interação com a lista de clientes
const Grid = ({ users, setUsers, setOnEdit }) => {
  // Função para lidar com a edição de um cliente
  const handleEdit = (item) => {
    setOnEdit(item);
  };

  // Função para lidar com a exclusão de um cliente
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3001/clientes/deletar/${id}`);
      toast.success("Cliente excluído com sucesso");
    } catch (error) {
      console.error("Erro ao excluir cliente:", error);
      toast.error("Erro ao excluir cliente");
    }
  };

  // Componente de grid renderizado
  return (
    <Table>
      <Thead>
        <Tr>
          <Th>Nome</Th>
          <Th>Email</Th>
          <Th>Telefone</Th>
          <Th>Coordenada X</Th>
          <Th>Coordenada Y</Th>
          <Th></Th>
          <Th></Th>
        </Tr>
      </Thead>
      <Tbody>
        {users.map((item, i) => (
          <Tr key={i}>
            <Td width="20%">{item.nome}</Td>
            <Td width="20%">{item.email}</Td>
            <Td width="20%">{item.telefone}</Td>
            <Td width="10%">{item.coordX}</Td>
            <Td width="10%">{item.coordY}</Td>
            <Td alignCenter width="5%">
              <FaEdit size={20} color="blue" onClick={() => handleEdit(item)} />
            </Td>
            <Td alignCenter width="5%">
              <FaTrash onClick={() => handleDelete(item.id)} />
            </Td>
          </Tr>
        ))}
      </Tbody>
    </Table>
  );
};

export default Grid;
