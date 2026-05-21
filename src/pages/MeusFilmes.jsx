import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import './MeusFilmes.css';

const myMovies = [
  {
    id: 101,
    title: "A Guerra de Amanhã",
    director: "IA FutureFlix (Você)",
    duration: "2h 18min",
    year: 2026,
    rating: "4.9",
    genre: "Sci-Fi",
    tags: ["Sci-Fi", "Ação", "Futuro"],
    image: "/a_guerra_de_amanha.png",
    description: "Em um futuro assolado por uma invasão alienígena devastadora, a humanidade trava uma guerra perdida. Para mudar o destino do planeta, soldados do presente são transportados para a linha de frente do futuro em uma última tentativa de salvação."
  },
  {
    id: 102,
    title: "Conexão Cyberpunk",
    director: "IA FutureFlix (Você)",
    duration: "15min",
    year: 2026,
    rating: "4.8",
    genre: "Cyberpunk",
    tags: ["Cyberpunk", "Ação", "Hacker"],
    image: "/conexao_cyberpunk.png",
    description: "Um hacker talentoso descobre que sua consciência digital foi acoplada à rede de segurança de uma megacorporação. Agora, ele precisa decodificar a conspiração corporativa antes que apaguem sua existência física."
  }
];

export default function MeusFilmes() {
  const [selectedMovie, setSelectedMovie] = useState(null);
  const navigate = useNavigate();

  // Fechar modal ao apertar a tecla ESC
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setSelectedMovie(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleWatch = (e) => {
    e.stopPropagation();
    navigate('/player');
  };

  return (
    <div className="meus-filmes-page">
      <Header />
      
      <main className="meus-filmes-content">
        <div className="meus-filmes-header">
          <div className="meus-filmes-title-section">
            <h1>Meus Filmes Gerados</h1>
            <p>Seu acervo particular de produções audiovisuais criadas via inteligência artificial.</p>
          </div>
          <button className="btn-create-new" onClick={() => navigate('/home')}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="12" y1="5" x2="12" y2="19"></line>
              <line x1="5" y1="12" x2="19" y2="12"></line>
            </svg>
            Criar Novo Filme
          </button>
        </div>

        {/* Grade de Meus Filmes */}
        <div className="movies-grid">
          {myMovies.map((movie) => (
            <div 
              key={movie.id} 
              className="movie-card"
              onClick={() => setSelectedMovie(movie)}
            >
              <div className="movie-card-poster-wrapper">
                <img src={movie.image} alt={`Poster de ${movie.title}`} className="movie-card-image" />
                <div className="movie-card-overlay">
                  <button className="play-hover-btn" onClick={handleWatch} title="Assistir Agora">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                      <polygon points="5 3 19 12 5 21 5 3"></polygon>
                    </svg>
                  </button>
                </div>
                <span className="movie-card-badge">{movie.genre}</span>
              </div>
              
              <div className="movie-card-info">
                <div className="movie-card-meta">
                  <span className="movie-card-rating">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" style={{ color: '#f39c12' }}>
                      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                    </svg>
                    {movie.rating}
                  </span>
                  <span className="movie-card-duration">{movie.duration}</span>
                </div>
                <h3>{movie.title}</h3>
                <p className="movie-card-desc-preview">{movie.description}</p>
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* Modal de Detalhes do Filme */}
      {selectedMovie && (
        <div className="movie-detail-modal-backdrop" onClick={() => setSelectedMovie(null)}>
          <div className="movie-detail-modal" onClick={(e) => e.stopPropagation()}>
            <button className="close-modal-btn" onClick={() => setSelectedMovie(null)}>×</button>
            
            <div className="modal-body-layout">
              <div className="modal-poster-side">
                <img src={selectedMovie.image} alt={`Poster de ${selectedMovie.title}`} />
              </div>
              
              <div className="modal-info-side">
                <div className="modal-meta-top">
                  <span className="modal-year">{selectedMovie.year}</span>
                  <span className="modal-divider">•</span>
                  <span className="modal-duration">{selectedMovie.duration}</span>
                  <span className="modal-divider">•</span>
                  <span className="modal-rating">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" style={{ color: '#f39c12', marginRight: '4px' }}>
                      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                    </svg>
                    {selectedMovie.rating} / 5.0
                  </span>
                </div>

                <h2>{selectedMovie.title}</h2>
                <span className="modal-director">Dirigido por: <strong>{selectedMovie.director}</strong></span>
                
                <p className="modal-description">{selectedMovie.description}</p>
                
                <div className="modal-tags-container">
                  {selectedMovie.tags.map((tag) => (
                    <span key={tag} className="modal-tag-badge">#{tag}</span>
                  ))}
                </div>

                <div className="modal-actions">
                  <button className="modal-watch-btn" onClick={handleWatch}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                      <polygon points="5 3 19 12 5 21 5 3"></polygon>
                    </svg>
                    Assistir Filme
                  </button>
                  <button className="modal-close-action" onClick={() => setSelectedMovie(null)}>
                    Voltar
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
