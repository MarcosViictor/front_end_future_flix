import { useNavigate, useSearchParams } from 'react-router-dom';
import Header from '../components/Header';
import './FlowPlayer.css';

/**
 * FlowPlayer — Player de videos do Google Flow TV.
 * 
 * Recebe via query string:
 *   ?videoUrl=<url_gcs>&prompt=<texto>&thumbnailUrl=<url>&generationId=<id>
 * 
 * Exibe o video diretamente do GCS do Google (sem download local),
 * reutilizando a estrutura visual do Player.jsx existente.
 */
export default function FlowPlayer() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const videoUrl = searchParams.get('videoUrl');
  const prompt = searchParams.get('prompt');
  const thumbnailUrl = searchParams.get('thumbnailUrl');
  const generationId = searchParams.get('generationId');

  // Estado de erro: sem URL fornecida
  if (!videoUrl) {
    return (
      <div className="flow-player-page">
        <Header />
        <main className="flow-player-content">
          <div className="flow-empty-state">
            <div className="flow-empty-icon">🎬</div>
            <h2>Nenhum vídeo selecionado</h2>
            <p>Use a barra de busca no topo para encontrar um vídeo do Flow TV.</p>
            <button
              className="flow-btn-back"
              style={{ maxWidth: '200px', margin: '20px auto', display: 'block' }}
              onClick={() => navigate('/catalogo')}
            >
              ← Ir ao Catálogo
            </button>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="flow-player-page">
      <Header />

      <main className="flow-player-content">
        <div className="flow-player-wrapper">

          {/* Player de Vídeo */}
          <div className="flow-video-container">
            <video
              className="flow-generated-video"
              controls
              autoPlay
              src={videoUrl}
              poster={thumbnailUrl || undefined}
              crossOrigin="anonymous"
            >
              Seu navegador não suporta a reprodução de vídeo.
            </video>
          </div>

          {/* Painel de Detalhes */}
          <div className="flow-details-panel">
            <div className="flow-details-header">
              <div className="flow-details-title">
                <h2>🎞️ Flow TV</h2>
                <span className="flow-tv-badge">
                  <span className="flow-tv-badge-dot" />
                  Google Flow AI
                </span>
              </div>
              {generationId && (
                <span style={{ fontSize: '11px', color: 'rgba(255,255,255,0.2)', fontFamily: 'monospace' }}>
                  ID: {generationId.slice(0, 12)}...
                </span>
              )}
            </div>

            {prompt && (
              <div>
                <p className="flow-prompt-label">Prompt de Geração</p>
                <p className="flow-prompt-text">"{prompt}"</p>
              </div>
            )}
          </div>

          {/* Ações */}
          <div className="flow-player-actions">
            <button
              className="flow-btn-back"
              onClick={() => navigate(-1)}
            >
              ← Voltar
            </button>
            <button
              className="flow-btn-catalog"
              onClick={() => navigate('/catalogo')}
            >
              Ver Catálogo FutureFlix 🍿
            </button>
          </div>

        </div>
      </main>
    </div>
  );
}
