import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Header from '../components/Header';
import { apiFetch } from '../services/api';
import './Player.css';

export default function Player() {
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const navigate = useNavigate();
  const location = useLocation();

  // Extrai o ID do filme a partir da query string (?id=xxxx)
  const queryParams = new URLSearchParams(location.search);
  const movieId = queryParams.get('id');

  useEffect(() => {
    if (!movieId) {
      setError('Nenhum identificador de filme foi especificado.');
      setLoading(false);
      return;
    }

    const fetchMovieDetails = async () => {
      try {
        const data = await apiFetch(`/movies/${movieId}`);
        setMovie(data);
      } catch (err) {
        console.error(err);
        setError('Não foi possível carregar os dados do filme.');
      } finally {
        setLoading(false);
      }
    };

    fetchMovieDetails();
  }, [movieId]);

  return (
    <div className="player-page">
      <Header />
      
      <main className="player-content">
        {loading ? (
          <div style={{ color: 'var(--text-muted)', textAlign: 'center', padding: '60px 0' }}>
            Carregando sua exibição exclusiva...
          </div>
        ) : error ? (
          <div style={{ textAlign: 'center', padding: '40px', background: 'rgba(229,62,62,0.1)', border: '1px solid rgba(229,62,62,0.3)', borderRadius: '8px', color: '#fc8181', maxWidth: '500px', margin: '40px auto' }}>
            ⚠️ {error}
            <div style={{ marginTop: '20px' }}>
              <button className="btn-secondary" style={{ padding: '8px 16px' }} onClick={() => navigate('/home')}>
                Voltar ao estúdio
              </button>
            </div>
          </div>
        ) : (
          <div className="player-wrapper" style={{ display: 'flex', flexDirection: 'column', gap: '20px', width: '100%', maxWidth: '960px' }}>
            <div className="video-container">
              <video 
                className="generated-video" 
                controls 
                autoPlay 
                src={movie.video_url || "/a_guerra_de_amanha.mp4"}
              >
                Seu navegador não suporta a tag de vídeo.
              </video>
            </div>

            <div className="movie-details-banner" style={{ padding: '20px', background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '12px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h2 style={{ margin: 0, fontSize: '24px', fontWeight: '700' }}>🎬 {movie.title}</h2>
                <div style={{ display: 'flex', gap: '8px' }}>
                  <span className="meta-pill style-pill" style={{ fontSize: '11px', background: 'rgba(229, 9, 20, 0.1)', border: '1px solid rgba(229, 9, 20, 0.3)', color: 'white', padding: '4px 8px', borderRadius: '12px', textTransform: 'capitalize' }}>
                    {movie.style}
                  </span>
                  {movie.genres.map((g, idx) => (
                    <span key={idx} className="meta-pill genre-pill" style={{ fontSize: '11px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)', color: 'var(--text-muted)', padding: '4px 8px', borderRadius: '12px', textTransform: 'capitalize' }}>
                      {g}
                    </span>
                  ))}
                </div>
              </div>
              <p style={{ margin: 0, fontSize: '15px', color: 'var(--text-muted)', fontStyle: 'italic', lineHeight: '1.6' }}>
                "{movie.prompt}"
              </p>
            </div>
            
            <div className="player-actions" style={{ display: 'flex', gap: '16px' }}>
              <button className="btn-secondary" onClick={() => navigate('/home')} style={{ flex: 1, padding: '12px 24px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: 'white', borderRadius: '8px', cursor: 'pointer', transition: 'all 0.2s' }}>
                ← Criar outro filme
              </button>
              <button className="btn-secondary" onClick={() => navigate('/meus-filmes')} style={{ flex: 1, padding: '12px 24px', background: 'var(--primary-color)', border: 'none', color: 'white', borderRadius: '8px', cursor: 'pointer', transition: 'all 0.2s' }}>
                Ver minha biblioteca 🍿
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
