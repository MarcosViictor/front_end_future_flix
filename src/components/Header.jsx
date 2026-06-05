import { useState } from 'react';
<<<<<<< HEAD
import { NavLink, useNavigate } from 'react-router-dom';
import { apiFetch } from '../services/api';
=======
import { NavLink, useNavigate, Link } from 'react-router-dom';
>>>>>>> origin/main
import './Header.css';

export default function Header({ simple = false }) {
  const navigate = useNavigate();
  const [showLogout, setShowLogout] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [searchError, setSearchError] = useState(null);

  const handleLogout = (e) => {
<<<<<<< HEAD
    e.stopPropagation();
=======
    e.stopPropagation(); // Evita fechar o menu imediatamente
    // TODO(security): Limpar tokens/estado de autenticação no backend no futuro.
>>>>>>> origin/main
    console.log('Logout mockado');
    navigate('/login');
  };

  const toggleLogout = () => {
    setShowLogout(!showLogout);
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchQuery.trim() || isSearching) return;

    setIsSearching(true);
    setSearchError(null);

    try {
      const result = await apiFetch('/flow/search', {
        method: 'POST',
        body: JSON.stringify({ query: searchQuery.trim() }),
      });

      // Navega para o FlowPlayer com a URL e prompt retornados
      const params = new URLSearchParams({
        videoUrl: result.videoUrl,
        prompt: result.prompt,
        thumbnailUrl: result.thumbnailUrl || '',
        generationId: result.generationId || '',
      });
      navigate(`/flow-player?${params.toString()}`);
      setSearchQuery('');
    } catch (err) {
      setSearchError('Erro na busca. Tente novamente.');
      setTimeout(() => setSearchError(null), 3000);
    } finally {
      setIsSearching(false);
    }
  };

  return (
    <header className="main-header">
      <div className="header-left">
        <Link to={simple ? "/login" : "/home"} className="logo" style={{ textDecoration: 'none' }}>
          <span className="logo-white">Future</span>
          <span className="logo-red">Flix</span>
<<<<<<< HEAD
        </div>
        <nav className="header-nav">
          <NavLink to="/home" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>Estúdio</NavLink>
          <NavLink to="/catalogo" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>Catálogo</NavLink>
          <NavLink to="/meus-filmes" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>Meus filmes</NavLink>
        </nav>
      </div>

      {/* Campo de Busca Flow TV */}
      <div className="header-search">
        <form className="header-search-form" onSubmit={handleSearch}>
          <span className="header-search-icon">🔍</span>
          <input
            className="header-search-input"
            type="text"
            placeholder="Buscar no Flow TV..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            disabled={isSearching}
            aria-label="Buscar vídeo no Flow TV"
          />
          <button
            type="submit"
            className="header-search-btn"
            disabled={isSearching || !searchQuery.trim()}
            aria-label={isSearching ? 'Buscando...' : 'Buscar'}
          >
            {isSearching ? (
              <div className="search-spinner" />
            ) : (
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                <path d="M5 12h14M12 5l7 7-7 7" stroke="rgba(255,255,255,0.5)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            )}
          </button>
        </form>
        {searchError && (
          <div className="search-error-toast">{searchError}</div>
        )}
      </div>

      <div className="header-right logout-trigger" onClick={toggleLogout} title="Opções de usuário">
        <span className="user-name">Usuário</span>
        <div className="user-avatar">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 12C14.21 12 16 10.21 16 8C16 5.79 14.21 4 12 4C9.79 4 8 5.79 8 8C8 10.21 9.79 12 12 12ZM12 14C9.33 14 4 15.34 4 18V20H20V18C20 15.34 14.67 14 12 14Z" fill="#E0E0E0"/>
          </svg>
        </div>

        {showLogout && (
          <div className="logout-dropdown">
            <button className="btn-logout" onClick={handleLogout}>
              Deseja sair?
            </button>
          </div>
=======
        </Link>
        {!simple && (
          <nav className="header-nav">
            <NavLink to="/home" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>Estúdio</NavLink>
            <NavLink to="/catalogo" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>Catálogo</NavLink>
            <NavLink to="/meus-filmes" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>Meus filmes</NavLink>
            <NavLink to="/loja-ia" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>Loja IA</NavLink>
          </nav>
>>>>>>> origin/main
        )}
      </div>
      
      {!simple && (
        <div className="header-right logout-trigger" onClick={toggleLogout} title="Opções de usuário">
          <span className="user-name">Usuário</span>
          <div className="user-avatar">
            {/* Ícone de avatar simplificado */}
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 12C14.21 12 16 10.21 16 8C16 5.79 14.21 4 12 4C9.79 4 8 5.79 8 8C8 10.21 9.79 12 12 12ZM12 14C9.33 14 4 15.34 4 18V20H20V18C20 15.34 14.67 14 12 14Z" fill="#E0E0E0"/>
            </svg>
          </div>

          {showLogout && (
            <div className="logout-dropdown">
              <button className="btn-logout" onClick={handleLogout}>
                Deseja sair?
              </button>
            </div>
          )}
        </div>
      )}
    </header>
  );
}
