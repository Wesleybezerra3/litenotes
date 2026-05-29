import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import api from '../../services/api';
import style from './style.module.css';

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    senha: "",
  });
  const navigate = useNavigate();

  const saveToken = (token) => {
    const expiration = Date.now() + 60 * 60 * 24000; // 24 horas em milissegundos
    localStorage.setItem("token", token);
    localStorage.setItem("token_expiration", expiration.toString());
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.email || !formData.senha) {
      alert("Por favor, preencha todos os campos!");
      return;
    }

    try {
      const response = await api.post("/api/users/login", {
        email: formData.email,
        senha: formData.senha,
      });

      console.log("Login realizado com sucesso:", response.data);
      alert("Login realizado com sucesso!");
      
      // Salvar token se necessário
      if (response.data.token) {
        saveToken(response.data.token);
      }
      
      setFormData({ email: "", senha: "" });
      navigate("/home");
    } catch (error) {
      console.error("Erro ao fazer login:", error);
      alert("Email ou senha incorretos!");
    }
  };

  
//   const handleForm = (e) => {
//     e.preventDefault();
//     if (Object.values(loginData).some((field) => !field)) {
//       setTextNotification(
//         "Por favor, preencha todos os campos antes de continuar. ✍️"
//       );
//       setResetKey((prev) => prev + 1);
//       return;
//     }
//     loginUser(loginData).then(() => {
//       setTimeout(() => {
//         navigate("/chats");
//       }, 3000);
//     });
//   };

  return (
    <main className={style.container}>
      <div className={style.header}>
        <h1>Entrar</h1>
      </div>
      
      <form className={style.form} onSubmit={handleSubmit}>
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
          <label htmlFor="senha">Senha</label>
          <input
            type="password"
            id="senha"
            name="senha"
            value={formData.senha}
            onChange={handleChange}
            placeholder="Digite sua senha"
            required
          />
        </div>

        <button type="submit">Entrar</button>
      </form>

      <div className={style.footer}>
        <p>Não tem uma conta?</p>
        <Link to="/register">Criar uma nova conta</Link>
      </div>
    </main>
  );
};

export default Login;