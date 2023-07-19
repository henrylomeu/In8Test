import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState(false);

  const handleLogin = () => {
    // Verifique se os campos de nome de usuário e senha estão preenchidos
    if (username.trim() === '' || password.trim() === '') {
      setLoginError(true);
      return;
    }

    // Lógica de autenticação

    // Redirecione para a página de Dashboard após o login bem-sucedido
    navigate('/dashboard', { state: { username } });
  };

  return (
    <div>
      <h2>Login</h2>
      {loginError && <p>Preencha todos os campos!</p>}
      <form>
        <label>
          Username:
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </label>
        <br />
        <label>
          Password:
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <br />
        <button type="button" onClick={handleLogin}>
          Entrar
        </button>
      </form>
    </div>
  );
};

export default Login;
