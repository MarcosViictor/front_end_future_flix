import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { apiFetch } from '../services/api';
import './GenerationStatus.css';

export default function GenerationStatus({ movieId }) {
  const [progress, setProgress] = useState(0);
  const [statusText, setStatusText] = useState('PENDING');
  const [errorMsg, setErrorMsg] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    if (!movieId) return;

    const checkStatus = async () => {
      try {
        // Consulta o status real da geração no backend FastAPI
        const data = await apiFetch(`/movies/${movieId}/status`);
        setProgress(data.progress);
        setStatusText(data.status);
        
        if (data.status === 'COMPLETED') {
          clearInterval(interval);
          // Redireciona para o Player passando o ID do filme gerado
          navigate(`/player?id=${movieId}`);
        } else if (data.status === 'FAILED') {
          clearInterval(interval);
          setErrorMsg('A geração do vídeo falhou na API do Google Veo. Tente novamente com outro prompt.');
        }
      } catch (err) {
        console.error('Erro no polling de status:', err);
      }
    };

    // Executa a primeira verificação imediatamente
    checkStatus();

    // Configura o HTTP Polling a cada 2.5 segundos
    const interval = setInterval(checkStatus, 2500);

    return () => clearInterval(interval);
  }, [movieId, navigate]);

  // Determinar qual etapa está ativa baseado no status real do backend
  const isScriptActive = statusText === 'PENDING' || statusText === 'GENERATING_SCRIPT';
  const isScenesActive = statusText === 'GENERATING_SCENES';
  const isRenderActive = statusText === 'RENDERING';

  // Se for completado, marca tudo como done
  const isScriptDone = statusText === 'GENERATING_SCENES' || statusText === 'RENDERING' || statusText === 'COMPLETED';
  const isScenesDone = statusText === 'RENDERING' || statusText === 'COMPLETED';

  return (
    <div className="generation-status-container">
      {errorMsg ? (
        <div style={{ color: '#fc8181', padding: '16px', background: 'rgba(229,62,62,0.1)', border: '1px solid rgba(229,62,62,0.3)', borderRadius: '8px', textAlign: 'center' }}>
          ⚠️ {errorMsg}
          <div style={{ marginTop: '12px' }}>
            <button className="btn-secondary" style={{ padding: '6px 12px', fontSize: '12px' }} onClick={() => window.location.reload()}>
              Voltar ao estúdio
            </button>
          </div>
        </div>
      ) : (
        <>
          <div className="status-lines">
            <div className={`status-line ${isScriptActive ? 'active' : isScriptDone ? 'done' : ''}`}>
              {isScriptDone ? '✅ Roteiro gerado' : '✍️ Gerando roteiro...'}
            </div>
            <div className={`status-line ${isScenesActive ? 'active' : isScenesDone ? 'done' : ''}`}>
              {isScenesDone ? '✅ Cenas criadas' : '🎥 Criando cenas com Google Veo...'}
            </div>
            <div className={`status-line ${isRenderActive ? 'active' : ''}`}>
              🎞️ Renderizando vídeo final...
            </div>
          </div>

          <div className="progress-bar-container">
            <div className="progress-bar-fill" style={{ width: `${progress}%` }}></div>
          </div>
          <div style={{ textAlign: 'center', marginTop: '10px', fontSize: '14px', color: 'var(--text-muted)' }}>
            Processando: {progress}%
          </div>
        </>
      )}
    </div>
  );
}
