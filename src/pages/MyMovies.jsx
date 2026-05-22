import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Button from '../components/Button';
import { apiFetch } from '../services/api';
import './MyMovies.css';

export default function MyMovies() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const data = await apiFetch('/movies/me');
        setMovies(data);
      } catch (err) {
        console.error(err);
        setError('Não foi possível carregar a lista de filmes.');
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
    
    // Polling a cada 5 segundos para atualizar progresso de filmes em andamento
    const interval = setInterval(fetchMovies, 5000);
    return () => clearInterval(interval);
  }, []);

  const handlePlayMovie = (movieId) => {
    navigate(`/player?id=${movieId}`);
  };

  const getStatusLabel = (status) => {
    switch (status) {
      case 'PENDING':
        return '⏳ Aguardando...';
      case 'GENERATING_SCRIPT':
        return '✍️ Escrevendo roteiro...';
      case 'GENERATING_SCENES':
        return '🎥 Filmando cenas...';
      case 'RENDERING':
        return '🎞️ Finalizando render...';
      case 'FAILED':
        return '❌ Falhou';
      default:
        return '🎬 Pronto';
    }
  };

  return (
    <div className="mymovies-page">
      <Header />
      <main className="mymovies-content">
        <div className="studio-header">
          <h1>🍿 Meus Filmes</h1>
          <p className="mymovies-subtitle">Sua biblioteca pessoal de criações cinematográficas exclusivas por inteligência artificial.</p>
        </div>

        {loading && movies.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '60px 0', color: 'var(--text-muted)' }}>
            Carregando sua biblioteca...
          </div>
        ) : error ? (
          <div style={{ color: '#fc8181', padding: '20px', border: '1px solid rgba(229,62,62,0.2)', borderRadius: '8px', background: 'rgba(229,62,62,0.05)' }}>
            {error}
          </div>
        ) : movies.length === 0 ? (
          <div className="empty-movies-container">
            <div style={{ fontSize: '48px' }}>🎬</div>
            <p>Você ainda não gerou nenhum filme no FutureFlix. Diga-nos sua ideia de filme e nós a transformaremos em realidade!</p>
            <Button variant="primary" onClick={() => navigate('/home')}>
              Criar meu primeiro filme
            </Button>
          </div>
        ) : (
          <div className="movies-grid">
            {movies.map((movie) => (
              <div key={movie.id} className="movie-card">
                <div className="movie-card-media">
                  <div className="movie-thumbnail-placeholder">
                    {movie.style === 'animação' ? '🦄' : movie.style === 'sci-fi' ? '🛸' : '🎞️'}
                  </div>
                  
                  {movie.status === 'COMPLETED' ? (
                    <div className="movie-play-overlay" onClick={() => handlePlayMovie(movie.id)}>
                      <button className="play-icon-btn">▶</button>
                    </div>
                  ) : (
                    <div className="movie-play-overlay" style={{ opacity: 1, background: 'rgba(0, 0, 0, 0.75)' }}>
                      <div className="movie-status-overlay">
                        <span className="progress-text">{getStatusLabel(movie.status)}</span>
                        <div className="mini-progress-bar-bg">
                          <div className="mini-progress-bar-fill" style={{ width: `${movie.progress}%` }}></div>
                        </div>
                        <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>{movie.progress}%</span>
                      </div>
                    </div>
                  )}
                </div>

                <div className="movie-card-info">
                  <h3>{movie.title}</h3>
                  <p className="movie-card-prompt">{movie.prompt}</p>
                  
                  <div className="movie-card-meta">
                    <span className="meta-pill style-pill">{movie.style}</span>
                    {movie.genres.map((g, idx) => (
                      <span key={idx} className="meta-pill genre-pill">{g}</span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
