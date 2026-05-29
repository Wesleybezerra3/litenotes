
import React, { useState } from "react";
import api from '../../services/api';
import style from './style.module.css';

const Register = () => {
  const [formData, setFormData] = useState({
    nome: "",
    email: "",
    dataNascimento: "",
    senha: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.senha !== formData.confirmPassword) {
      alert("As senhas não coincidem!");
      console.error("As senhas não coincidem!");
      return;
    }

    const data = {
      nome: formData.nome,
      email: formData.email,
      data_nascimento: formData.dataNascimento,
      senha: formData.senha,
    };

    try {
      // Use fetch to post; adjust if you have an api client
      const response = await api.post("/api/users", data);


      console.log(response);
      console.log(data);
      alert("Cadastro realizado com sucesso!");
      setFormData({ nome: "", email: "", dataNascimento: "", senha: "", confirmPassword: "" });

    } catch (error) {
      console.error("Erro ao enviar o formulário!", error);
      alert("Houve um erro ao enviar o formulário!");
    }
  };

  return (
    <main className={style.container}>
      <div className={style.header}>
        <h1>Criar Conta</h1>
      </div>
      <form className={style.form} onSubmit={handleSubmit}>
        <div className={style.formGroup}>
          <label htmlFor="nome">Nome</label>
          <input
            type="text"
            id="nome"
            name="nome"
            value={formData.nome}
            onChange={handleChange}
            placeholder="Seu nome completo"
            required
          />
        </div>

        <div className={style.formGroup}>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="seu@email.com"
            required
          />
        </div>

        <div className={style.formGroup}>
          <label htmlFor="dataNascimento">Data de Nascimento</label>
          <input
            type="date"
            id="dataNascimento"
            name="dataNascimento"
            value={formData.dataNascimento}
            onChange={handleChange}
            required
          />
        </div>

        <div className={style.formGroup}>
          <label htmlFor="senha">Senha</label>
          <input
            type="password"
            id="senha"
            name="senha"
            value={formData.senha}
            onChange={handleChange}
            placeholder="Crie uma senha"
            required
          />
        </div>

        <div className={style.formGroup}>
          <label htmlFor="confirmPassword">Confirmar Senha</label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            placeholder="Confirme sua senha"
            required
          />
        </div>

        <button type="submit">Cadastrar</button>
      </form>
    </main>
  );
};

export default Register;
