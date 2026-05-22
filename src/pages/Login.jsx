import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Input from '../components/Input';
import Button from '../components/Button';
import { apiFetch } from '../services/api';
import './Login.css';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [isRegister, setIsRegister] = useState(false); // Alterna entre Login e Cadastro
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    setSuccessMsg('');
    setLoading(true);

    try {
      if (isRegister) {
        // Fluxo de Cadastro de Usuário
        if (!name.trim()) {
          throw new Error('O campo nome é obrigatório.');
        }
        await apiFetch('/auth/register', {
          method: 'POST',
          body: JSON.stringify({ name, email, password }),
        });
        
        setSuccessMsg('Conta criada com sucesso! Faça login para continuar.');
        setIsRegister(false);
        setPassword(''); // Limpa a senha por segurança
      } else {
        // Fluxo de Login do Usuário
        const data = await apiFetch('/auth/login', {
          method: 'POST',
          body: JSON.stringify({ email, password }),
        });

        // Salva as informações de sessão no navegador
        localStorage.setItem('token', data.access_token);
        localStorage.setItem('user', JSON.stringify(data.user));

        // Navega para a área de criação (Studio / Home)
        navigate('/home');
      }
    } catch (err) {
      setErrorMsg(err.message || 'Ocorreu um erro no processamento. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  const toggleMode = (e) => {
    e.preventDefault();
    setIsRegister(!isRegister);
    setErrorMsg('');
    setSuccessMsg('');
    setName('');
    setEmail('');
    setPassword('');
  };

  return (
    <div className="login-page">
      <Header />
      <main className="login-content">
        <div className="login-form-container">
          <div className="login-header-text">
            <h1>{isRegister ? 'Crie sua conta no FutureFlix' : 'Informe seus dados para entrar'}</h1>
            <p>
              {isRegister ? 'Preencha os campos abaixo.' : 'Ou crie uma conta para começar a gerar filmes.'}
            </p>
          </div>

          {errorMsg && (
            <div className="auth-alert error-alert">
              ⚠️ {errorMsg}
            </div>
          )}

          {successMsg && (
            <div className="auth-alert success-alert">
              ✅ {successMsg}
            </div>
          )}
          
          <form onSubmit={handleSubmit} className="login-form">
            {isRegister && (
              <Input 
                label="Nome completo" 
                id="name" 
                type="text" 
                placeholder="Seu nome" 
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            )}

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
                placeholder="Sua senha" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <div className="create-account-link-wrapper">
                <a href="#" onClick={toggleMode} className="create-account-link">
                  {isRegister ? 'Já tenho uma conta. Entrar' : 'Criar uma conta'}
                </a>
              </div>
            </div>

            <Button type="submit" variant="primary" disabled={loading}>
              {loading ? 'Processando...' : isRegister ? 'Cadastrar' : 'Entrar'}
            </Button>
          </form>
        </div>
      </main>
    </div>
  );
}
