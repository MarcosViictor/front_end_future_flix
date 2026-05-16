import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';

function App() {
  return (
    <Router>
      <Routes>
        {/* Redirecionar raiz para login temporariamente para testar */}
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/home" element={<Home />} />
        <Route path="/login" element={<Login />} />
        {/* Futuras rotas como /player virão aqui */}
      </Routes>
    </Router>
  );
}

export default App;
