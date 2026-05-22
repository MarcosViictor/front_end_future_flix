import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Button from '../components/Button';
import { apiFetch } from '../services/api';
import './Catalog.css';
import './MyMovies.css'; // Compartilha estilos de grid e card

export default function Catalog() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCatalog = async () => {
      try {
        const data = await apiFetch('/movies/catalog');
        setMovies(data);
      } catch (err) {
        console.error(err);
        setError('Não foi possível carregar o catálogo público.');
      } finally {
        setLoading(false);
      }
    };

    fetchCatalog();
  }, []);

  const handlePlayMovie = (movieId) => {
    navigate(`/player?id=${movieId}`);
  };

  // Separa o filme mais recente para ser o destaque (Hero Banner)
  const heroMovie = movies.length > 0 ? movies[0] : null;
  
  // Filtra categorias para exibição estruturada
  const sciFiMovies = movies.filter(m => m.style === 'sci-fi');
  const animationMovies = movies.filter(m => m.style === 'animação');
  const otherMovies = movies.filter(m => m.style !== 'sci-fi' && m.style !== 'animação');

  return (
    <div className="catalog-page">
      <Header />
      
      {loading ? (
        <div style={{ textAlign: 'center', padding: '120px 0', color: 'var(--text-muted)' }}>
          Carregando catálogo cinematográfico...
        </div>
      ) : error ? (
        <div style={{ maxWidth: '600px', margin: '60px auto', padding: '20px', color: '#fc8181', border: '1px solid rgba(229,62,62,0.2)', borderRadius: '8px', background: 'rgba(229,62,62,0.05)', textAlign: 'center' }}>
          {error}
        </div>
      ) : movies.length === 0 ? (
        <div className="mymovies-content" style={{ textAlign: 'center', padding: '100px 20px' }}>
          <div style={{ fontSize: '48px', marginBottom: '20px' }}>🎬</div>
          <h2>O catálogo está vazio!</h2>
          <p style={{ color: 'var(--text-muted)', marginBottom: '30px' }}>Seja o pioneiro a criar e compartilhar um filme com o estúdio de IA.</p>
          <Button variant="primary" onClick={() => navigate('/home')}>
            Criar um filme agora
          </Button>
        </div>
      ) : (
        <>
          {/* Banner Hero do Filme Destaque */}
          {heroMovie && (
            <section className="catalog-hero">
              <div className="catalog-hero-bg">
                <span style={{ fontSize: '100px', opacity: 0.15 }}>
                  {heroMovie.style === 'animação' ? '🦄' : heroMovie.style === 'sci-fi' ? '🛸' : '🎬'}
                </span>
              </div>
              <div className="catalog-hero-content">
                <span className="catalog-hero-tag">🔥 NOVO DESTAQUE</span>
                <h1>{heroMovie.title}</h1>
                <p className="catalog-hero-prompt">"{heroMovie.prompt}"</p>
                
                <div className="catalog-hero-meta">
                  <span className="meta-pill style-pill">{heroMovie.style}</span>
                  {heroMovie.genres.map((g, idx) => (
                    <span key={idx} className="meta-pill genre-pill">{g}</span>
                  ))}
                </div>

                <div className="catalog-hero-actions">
                  <Button variant="primary" onClick={() => handlePlayMovie(heroMovie.id)}>
                    ▶ Assistir agora
                  </Button>
                  <Button variant="secondary" onClick={() => navigate('/home')}>
                    + Criar outro
                  </Button>
                </div>
              </div>
            </section>
          )}

          {/* Listas de Conteúdo por Categoria */}
          <div className="catalog-content">
            
            {/* Seção Sci-Fi */}
            {sciFiMovies.length > 0 && (
              <div className="catalog-section">
                <h2>🛸 Universos Sci-Fi por IA</h2>
                <div className="catalog-row">
                  {sciFiMovies.map((movie) => (
                    <div key={movie.id} className="movie-card">
                      <div className="movie-card-media">
                        <div className="movie-thumbnail-placeholder">🛸</div>
                        <div className="movie-play-overlay" onClick={() => handlePlayMovie(movie.id)}>
                          <button className="play-icon-btn">▶</button>
                        </div>
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
              </div>
            )}

            {/* Seção Animação */}
            {animationMovies.length > 0 && (
              <div className="catalog-section">
                <h2>🦄 Mundos de Animação</h2>
                <div className="catalog-row">
                  {animationMovies.map((movie) => (
                    <div key={movie.id} className="movie-card">
                      <div className="movie-card-media">
                        <div className="movie-thumbnail-placeholder">🦄</div>
                        <div className="movie-play-overlay" onClick={() => handlePlayMovie(movie.id)}>
                          <button className="play-icon-btn">▶</button>
                        </div>
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
              </div>
            )}

            {/* Seção Outros */}
            {otherMovies.length > 0 && (
              <div className="catalog-section">
                <h2>🎬 Outras Realidades</h2>
                <div className="catalog-row">
                  {otherMovies.map((movie) => (
                    <div key={movie.id} className="movie-card">
                      <div className="movie-card-media">
                        <div className="movie-thumbnail-placeholder">🎞️</div>
                        <div className="movie-play-overlay" onClick={() => handlePlayMovie(movie.id)}>
                          <button className="play-icon-btn">▶</button>
                        </div>
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
              </div>
            )}

          </div>
        </>
      )}
    </div>
  );
}
