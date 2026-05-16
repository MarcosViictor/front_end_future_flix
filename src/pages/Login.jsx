import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Input from '../components/Input';
import Button from '../components/Button';
import './Login.css';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    // TODO: Implementar chamada real para o backend no futuro
    console.log('Login mockado:', { email, password });
    // Navegar para a home após o login (mock)
    navigate('/home');
  };

  return (
    <div className="login-page">
      <Header />
      <main className="login-content">
        <div className="login-form-container">
          <div className="login-header-text">
            <h1>Informe seus dados para entrar</h1>
            <p>Ou crie uma conta.</p>
          </div>
          
          <form onSubmit={handleLogin} className="login-form">
            <Input 
              label="Email" 
              id="email" 
              type="email" 
              placeholder="email@mail.com" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            
            <div className="password-group">
              <Input 
                label="Senha" 
                id="password" 
                type="password" 
                placeholder="senha" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <div className="create-account-link-wrapper">
                <a href="#" className="create-account-link">Criar uma conta</a>
              </div>
            </div>

            <Button type="submit" variant="primary">
              Entrar
            </Button>
          </form>
        </div>
      </main>
    </div>
  );
}
