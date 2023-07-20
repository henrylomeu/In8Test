import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Login.module.css'

const Login = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');

  const handleLogin = () => {
    if (username.trim() === '') {
      alert('Fill in the user field.');
      return;
    }
    navigate('/dashboard', { state: { username } });
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h2>Login</h2>
        <form>
          <div className={styles.field}>
            <label>
              Usuário:
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </label>
          </div>
          <div className={styles.loginBtn}>
            <button type="button" onClick={handleLogin}>
              Entrar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
