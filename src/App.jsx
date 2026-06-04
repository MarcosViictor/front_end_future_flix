import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Cadastro from './pages/Cadastro';
import Catalogo from './pages/Catalogo';
import Player from './pages/Player';
import MeusFilmes from './pages/MeusFilmes';
import LojaIA from './pages/LojaIA';

function App() {
  return (
    <Router>
      <Routes>
        {/* Redirecionar raiz para login temporariamente para testar */}
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/home" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/cadastro" element={<Cadastro />} />
        <Route path="/catalogo" element={<Catalogo />} />
        <Route path="/player" element={<Player />} />
        <Route path="/meus-filmes" element={<MeusFilmes />} />
        <Route path="/loja-ia" element={<LojaIA />} />
      </Routes>
    </Router>
  );
}

export default App;
