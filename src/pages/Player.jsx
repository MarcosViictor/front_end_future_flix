import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import './Player.css';

export default function Player() {
  const navigate = useNavigate();

  return (
    <div className="player-page">
      <Header />
      
      <main className="player-content">
        <div className="video-container">
          {/* O arquivo a_guerra_de_amanha.mp4 precisa estar na pasta public/ */}
          <video 
            className="generated-video" 
            controls 
            autoPlay 
            src="/a_guerra_de_amanha.mp4"
          >
            Seu navegador não suporta a tag de vídeo.
          </video>
        </div>
        
        <div className="player-actions">
          <button className="btn-secondary" onClick={() => navigate('/home')}>
            ← Criar outro filme
          </button>
        </div>
      </main>
    </div>
  );
}
