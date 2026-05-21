import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Header from '../components/Header';
import Input from '../components/Input';
import Button from '../components/Button';
import './Cadastro.css';

export default function Cadastro() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  const navigate = useNavigate();

  const handleCadastro = (e) => {
    e.preventDefault();
    setError('');
    setSuccess(false);

    // Validação de nome
    if (name.trim().length < 3) {
      setError('O nome completo deve conter pelo menos 3 caracteres.');
      return;
    }

    // Validação de e-mail
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError('Por favor, insira um e-mail válido.');
      return;
    }

    // Validação de tamanho de senha (diretriz de segurança: mínimo 8 caracteres)
    if (password.length < 8) {
      setError('A senha deve conter pelo menos 8 caracteres.');
      return;
    }

    // Validação de senhas coincidentes
    if (password !== confirmPassword) {
      setError('As senhas não coincidem. Por favor, verifique.');
      return;
    }

    setIsLoading(true);

    // Simulação de chamada de cadastro do backend
    setTimeout(() => {
      // TODO(security): Substituir cadastro simulada por chamada real para API e armazenamento de credenciais hashing no backend.
      console.log('Cadastro simulado com sucesso para o e-mail:', email);
      setIsLoading(false);
      setSuccess(true);
      
      // Redirecionar para o login após 2 segundos
      setTimeout(() => {
        navigate('/login');
      }, 2000);
    }, 1500);
  };

  const passwordToggle = (
    <button
      type="button"
      onClick={() => setShowPassword(!showPassword)}
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

  const confirmPasswordToggle = (
    <button
      type="button"
      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
      className="password-toggle-btn"
      aria-label={showConfirmPassword ? "Esconder confirmação de senha" : "Mostrar confirmação de senha"}
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
      {showConfirmPassword ? (
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
    <div className="cadastro-page">
      <Header simple />
      <main className="cadastro-content">
        <div className="cadastro-form-container">
          <div className="cadastro-header-text">
            <h1>Crie sua conta</h1>
            <p>Cadastre-se para começar a gerar seus próprios filmes com Inteligência Artificial.</p>
          </div>

          {error && (
            <div className="cadastro-error-message">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10"></circle>
                <line x1="12" y1="8" x2="12" y2="12"></line>
                <line x1="12" y1="16" x2="12.01" y2="16"></line>
              </svg>
              <span>{error}</span>
            </div>
          )}

          {success && (
            <div className="cadastro-success-message">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                <polyline points="22 4 12 14.01 9 11.01"></polyline>
              </svg>
              <span>Conta criada com sucesso! Redirecionando...</span>
            </div>
          )}
          
          <form onSubmit={handleCadastro} className="cadastro-form">
            <Input 
              label="Nome Completo" 
              id="name" 
              type="text" 
              placeholder="Digite seu nome completo" 
              value={name}
              onChange={(e) => setName(e.target.value)}
              disabled={isLoading || success}
              required
            />

            <Input 
              label="E-mail" 
              id="email" 
              type="email" 
              placeholder="seuemail@provedor.com" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={isLoading || success}
              required
            />
            
            <Input 
              label="Senha" 
              id="password" 
              type={showPassword ? "text" : "password"} 
              placeholder="Crie uma senha (mín. 8 caracteres)" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              rightElement={passwordToggle}
              disabled={isLoading || success}
              required
            />

            <div className="password-group">
              <Input 
                label="Confirmar Senha" 
                id="confirmPassword" 
                type={showConfirmPassword ? "text" : "password"} 
                placeholder="Confirme sua senha" 
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                rightElement={confirmPasswordToggle}
                disabled={isLoading || success}
                required
              />
              <div className="login-link-wrapper">
                <span>Já tem conta? </span>
                <Link to="/login" className="login-link">Entrar</Link>
              </div>
            </div>

            <Button type="submit" variant="primary" disabled={isLoading || success}>
              {isLoading ? (
                <span className="btn-loader-container">
                  <span className="btn-spinner"></span>
                  Criando conta...
                </span>
              ) : 'Criar minha conta'}
            </Button>
          </form>
        </div>
      </main>
    </div>
  );
}
