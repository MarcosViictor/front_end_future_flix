import { NavLink } from 'react-router-dom';
import './Header.css';

export default function Header() {
  return (
    <header className="main-header">
      <div className="header-left">
        <div className="logo">
          <span className="logo-white">Future</span>
          <span className="logo-red">Flix</span>
        </div>
        <nav className="header-nav">
          <NavLink to="/home" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>Estúdio</NavLink>
          <NavLink to="/catalogo" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>Catálogo</NavLink>
          <NavLink to="/meus-filmes" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>Meus filmes</NavLink>
        </nav>
      </div>
      
      <div className="header-right">
        <span className="user-name">Usuário</span>
        <div className="user-avatar">
          {/* Ícone de avatar simplificado */}
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 12C14.21 12 16 10.21 16 8C16 5.79 14.21 4 12 4C9.79 4 8 5.79 8 8C8 10.21 9.79 12 12 12ZM12 14C9.33 14 4 15.34 4 18V20H20V18C20 15.34 14.67 14 12 14Z" fill="#E0E0E0"/>
          </svg>
        </div>
      </div>
    </header>
  );
}
