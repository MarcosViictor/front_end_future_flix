import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Player from './pages/Player';
import Catalog from './pages/Catalog';
import MyMovies from './pages/MyMovies';
import FlowPlayer from './pages/FlowPlayer';

/**
 * Componente de Guarda de Rota Privada.
 * Redireciona o usuário para a página de Login caso não esteja autenticado.
 */
function PrivateRoute({ children }) {
  const token = localStorage.getItem('token');
  return token ? children : <Navigate to="/login" replace />;
}

/**
 * Redirecionador inteligente para a página raiz.
 * Envia usuários autenticados para a home/estúdio e visitantes para o login.
 */
function RootRedirect() {
  const token = localStorage.getItem('token');
  return token ? <Navigate to="/home" replace /> : <Navigate to="/login" replace />;
}

function App() {
  return (
    <Router>
      <Routes>
        {/* Roteamento inteligente na raiz */}
        <Route path="/" element={<RootRedirect />} />
        
        {/* Rota Pública */}
        <Route path="/login" element={<Login />} />
        
        {/* Rotas Protegidas por JWT */}
        <Route 
          path="/home" 
          element={
            <PrivateRoute>
              <Home />
            </PrivateRoute>
          } 
        />
        
        <Route 
          path="/player" 
          element={
            <PrivateRoute>
              <Player />
            </PrivateRoute>
          } 
        />
        
        <Route 
          path="/catalogo" 
          element={
            <PrivateRoute>
              <Catalog />
            </PrivateRoute>
          } 
        />
        
        <Route 
          path="/meus-filmes" 
          element={
            <PrivateRoute>
              <MyMovies />
            </PrivateRoute>
          } 
        />

        <Route 
          path="/flow-player" 
          element={
            <PrivateRoute>
              <FlowPlayer />
            </PrivateRoute>
          } 
        />

        {/* Fallback de rotas inexistentes redireciona para a raiz */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
