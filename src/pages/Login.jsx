import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Header from '../components/Header';
import Input from '../components/Input';
import Button from '../components/Button';
import { apiFetch } from '../services/api';
import './Login.css';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
<<<<<<< HEAD
  const [name, setName] = useState('');
  const [isRegister, setIsRegister] = useState(false); // Alterna entre Login e Cadastro
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [loading, setLoading] = useState(false);
=======
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
>>>>>>> origin/main
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
<<<<<<< HEAD
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
=======
    setError('');

    // Validar formato de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError('Por favor, insira um e-mail válido.');
      return;
    }

    // Validar comprimento de senha (diretriz de segurança: mínimo 8 caracteres)
    if (password.length < 8) {
      setError('A senha deve conter pelo menos 8 caracteres.');
      return;
    }

    setIsLoading(true);

    // TODO(security): Substituir autenticação simulada por fluxo de login com JWT seguro via BFF / Cookies HttpOnly.
    setTimeout(() => {
      // Simular login bem-sucedido
      console.log('Autenticação simulada para o e-mail:', email);
      setIsLoading(false);
      navigate('/home');
    }, 1200);
>>>>>>> origin/main
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const passwordToggle = (
    <button
      type="button"
      onClick={togglePasswordVisibility}
      className="password-toggle-btn"
      aria-label={showPassword ? "Esconder senha" : "Mostrar senha"}
      style={{
        background: 'none',
        border: 'none',
        color: 'var(--text-muted)',
        display: 'flex',
        alignItems: 'center',
        padding: '4px',
        cursor: 'pointer',
        transition: 'color 0.2s ease',
      }}
      onMouseEnter={(e) => e.currentTarget.style.color = 'var(--text-main)'}
      onMouseLeave={(e) => e.currentTarget.style.color = 'var(--text-muted)'}
    >
      {showPassword ? (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path>
          <line x1="1" y1="1" x2="23" y2="23"></line>
        </svg>
      ) : (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
          <circle cx="12" cy="12" r="3"></circle>
        </svg>
      )}
    </button>
  );

  return (
    <div className="login-page">
      <Header simple />
      <main className="login-content">
        <div className="login-form-container">
          <div className="login-header-text">
<<<<<<< HEAD
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
=======
            <h1>Informe seus dados para entrar</h1>
            <p>Acesse sua conta para criar novos universos cinematográficos.</p>
          </div>

          {error && (
            <div className="login-error-message">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10"></circle>
                <line x1="12" y1="8" x2="12" y2="12"></line>
                <line x1="12" y1="16" x2="12.01" y2="16"></line>
              </svg>
              <span>{error}</span>
>>>>>>> origin/main
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
              label="E-mail" 
              id="email" 
              type="email" 
              placeholder="seuemail@provedor.com" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={isLoading}
              required
            />
            
            <div className="password-group">
              <Input 
                label="Senha" 
                id="password" 
<<<<<<< HEAD
                type="password" 
                placeholder="Sua senha" 
=======
                type={showPassword ? "text" : "password"} 
                placeholder="Insira sua senha" 
>>>>>>> origin/main
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                rightElement={passwordToggle}
                disabled={isLoading}
                required
              />
              <div className="create-account-link-wrapper">
<<<<<<< HEAD
                <a href="#" onClick={toggleMode} className="create-account-link">
                  {isRegister ? 'Já tenho uma conta. Entrar' : 'Criar uma conta'}
                </a>
              </div>
            </div>

            <Button type="submit" variant="primary" disabled={loading}>
              {loading ? 'Processando...' : isRegister ? 'Cadastrar' : 'Entrar'}
=======
                <span>Novo por aqui? </span>
                <Link to="/cadastro" className="create-account-link">Criar uma conta</Link>
              </div>
            </div>

            <Button type="submit" variant="primary" disabled={isLoading}>
              {isLoading ? (
                <span className="btn-loader-container">
                  <span className="btn-spinner"></span>
                  Entrando...
                </span>
              ) : 'Entrar'}
>>>>>>> origin/main
            </Button>
          </form>
        </div>
      </main>
    </div>
  );
}
