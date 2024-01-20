import React, { useState, useEffect, useRef } from "react";
import { cadastrarCliente } from "../services/Api";
import styled from "styled-components";
import { toast } from "react-toastify";
import axios from "axios";

// Definindo o estilo do formulário utilizando a biblioteca styled-components
const FormContainer = styled.form`
  display: flex;
  align-items: flex-end;
  gap: 10px;
  flex-wrap: wrap;
  background-color: #fff;
  padding: 20px;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
  border-radius: 5px;
`;

// Definindo o estilo do input
const Input = styled.input`
  width: 120px;
  padding: 0 10px;
  border: 1px solid #bbb;
  border-radius: 5px;
  height: 40px;
`;

// Definindo o estilo da label
const Label = styled.label``;

// Definindo o estilo da área de input
const InputArea = styled.div`
  display: flex;
  flex-direction: column;
`;

// Definindo o estilo do botão
const Button = styled.button`
  padding: 10px;
  cursor: pointer;
  border-radius: 5px;
  border: none;
  background-color: #4caf50;
  color: #fff;
  height: 42px;
`;

// Componente de formulário para adicionar ou editar clientes
const Form = ({ onAdd, editingUser, onEdit, onUpdateUser }) => {
  // Estado para armazenar os dados do formulário
  const [formData, setFormData] = useState({
    nome: "",
    email: "",
    telefone: "",
    coordX: "",
    coordY: "",
  });

  // Referência para o formulário
  const ref = useRef();

  // Efeito para preencher o formulário com os dados do cliente em edição
  useEffect(() => {
    if (editingUser) {
      const { nome, email, telefone, coordX, coordY } = editingUser;
      setFormData({ nome, email, telefone, coordX, coordY });
    }
  }, [editingUser]);

  // Função para lidar com as mudanças nos inputs
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  // Função para lidar com o envio do formulário
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Verificar se todos os campos foram preenchidos
    if (
      !formData.nome ||
      !formData.email ||
      !formData.telefone ||
      !formData.coordX ||
      !formData.coordY
    ) {
      return toast.error("Preencha todos os campos");
    }

    // Se estiver editando, enviar uma requisição de atualização
    if (editingUser) {
      try {
        await axios.put(
          `http://localhost:3001/clientes/editar/${editingUser.id}`,
          formData
        );
        toast.success("Cliente atualizado com sucesso");
        onUpdateUser({ id: editingUser.id, ...formData });
        setFormData({
          nome: "",
          email: "",
          telefone: "",
          coordX: "",
          coordY: "",
        });
      } catch (error) {
        console.error("Erro ao editar cliente:", error);
        toast.error("Erro ao editar cliente");
      }
    } else {
      // Se não estiver editando, enviar uma requisição de cadastro
      onAdd(formData);
      setFormData({
        nome: "",
        email: "",
        telefone: "",
        coordX: "",
        coordY: "",
      });
    }
  };

  // Componente de formulário renderizado
  return (
    <FormContainer onSubmit={handleSubmit} ref={ref}>
      <InputArea>
        <Label>Nome</Label>
        <Input name="nome" value={formData.nome} onChange={handleChange} />
      </InputArea>
      <InputArea>
        <Label>E-mail</Label>
        <Input
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
        />
      </InputArea>
      <InputArea>
        <Label>Telefone</Label>
        <Input
          name="telefone"
          value={formData.telefone}
          onChange={handleChange}
        />
      </InputArea>
      <InputArea>
        <Label>Coordenada X</Label>
        <Input name="coordX" value={formData.coordX} onChange={handleChange} />
      </InputArea>
      <InputArea>
        <Label>Coordenada Y</Label>
        <Input name="coordY" value={formData.coordY} onChange={handleChange} />
      </InputArea>
      <Button type="submit">{editingUser ? "ATUALIZAR" : "SALVAR"}</Button>
    </FormContainer>
  );
};


export default Form;
