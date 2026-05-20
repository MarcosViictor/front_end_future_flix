import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './GenerationStatus.css';

export default function GenerationStatus() {
  const [progress, setProgress] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    // Simular o progresso da geração
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          navigate('/player');
          return 100;
        }
        return prev + 1; /* incrementa 1% a cada 100ms = 10 segundos totais */
      });
    }, 100);

    return () => clearInterval(interval);
  }, [navigate]);

  // Determinar qual etapa está ativa baseado no progresso
  const isScriptActive = progress < 30;
  const isScenesActive = progress >= 30 && progress < 70;
  const isRenderActive = progress >= 70;

  return (
    <div className="generation-status-container">
      <div className="status-lines">
        <div className={`status-line ${isScriptActive ? 'active' : progress >= 30 ? 'done' : ''}`}>
          ✍️ Gerando roteiro...
        </div>
        <div className={`status-line ${isScenesActive ? 'active' : progress >= 70 ? 'done' : ''}`}>
          🎥 Criando cenas...
        </div>
        <div className={`status-line ${isRenderActive ? 'active' : ''}`}>
          🎞️ Renderizando vídeo...
        </div>
      </div>

      <div className="progress-bar-container">
        <div className="progress-bar-fill" style={{ width: `${progress}%` }}></div>
      </div>
    </div>
  );
}
