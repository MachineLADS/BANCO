import React, { useState } from 'react';

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [isRegistering, setIsRegistering] = useState(false); // Estado para alternar entre login e registro
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  // Função para alternar entre a tela de login e a tela de registro
  const toggleRegister = () => {
    setIsRegistering(!isRegistering);
    setUsername('');
    setPassword('');
  };

  // Função para verificar o login
  const handleLogin = async () => {
    // Aqui você pode adicionar a lógica de autenticação.
    // Por simplicidade, vou deixar o código de login básico.
    if (username === 'admin' && password === '1234') {
      setLoggedIn(true);
    } else {
      alert('Usuário ou senha incorretos');
    }
  };

  // Função para registrar um novo usuário
  const handleRegister = async () => {
    try {
      const response = await fetch('/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });
      if (response.ok) {
        alert('Conta registrada com sucesso!');
        setIsRegistering(false); // Volta para a tela de login
      } else {
        alert('Erro ao registrar conta');
      }
    } catch (error) {
      console.error('Erro ao registrar:', error);
    }
  };

  return (
    <div className="App">
      {!loggedIn ? (
        isRegistering ? (
          <RegisterScreen
            username={username}
            setUsername={setUsername}
            password={password}
            setPassword={setPassword}
            handleRegister={handleRegister}
            toggleRegister={toggleRegister}
          />
        ) : (
          <LoginScreen
            username={username}
            setUsername={setUsername}
            password={password}
            setPassword={setPassword}
            handleLogin={handleLogin}
            toggleRegister={toggleRegister}
          />
        )
      ) : (
        <h2>Bem-vindo!</h2>
      )}
    </div>
  );
}

// Componente de Tela de Login
const LoginScreen = ({ username, setUsername, password, setPassword, handleLogin, toggleRegister }) => (
  <div className="login-container">
    <h2>Login</h2>
    <input
      type="text"
      placeholder="Usuário"
      value={username}
      onChange={(e) => setUsername(e.target.value)}
    />
    <input
      type="password"
      placeholder="Senha"
      value={password}
      onChange={(e) => setPassword(e.target.value)}
    />
    <button onClick={handleLogin}>Entrar</button>
    <p>Não tem uma conta? <button onClick={toggleRegister}>Registre-se</button></p>
  </div>
);

// Componente de Tela de Registro
const RegisterScreen = ({ username, setUsername, password, setPassword, handleRegister, toggleRegister }) => (
  <div className="register-container">
    <h2>Registrar</h2>
    <input
      type="text"
      placeholder="Usuário"
      value={username}
      onChange={(e) => setUsername(e.target.value)}
    />
    <input
      type="password"
      placeholder="Senha"
      value={password}
      onChange={(e) => setPassword(e.target.value)}
    />
    <button onClick={handleRegister}>Registrar</button>
    <p>Já tem uma conta? <button onClick={toggleRegister}>Faça login</button></p>
  </div>
);

export default App;