import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import './Catalogo.css';

const movies = [
  {
    id: 1,
    title: "Sombras de Neo-Kyoto",
    director: "IA FutureFlix v5.1",
    duration: "1h 45min",
    year: 2026,
    rating: "4.8",
    genre: "Cyberpunk",
    tags: ["Cyberpunk", "Noir", "Suspense"],
    image: "/cyberpunk_detective.png",
    description: "Em um futuro onde memórias são mercadorias negociadas no mercado negro, um detetive de cibernética investiga o sumiço da mente brilhante por trás da rede neural da cidade."
  },
  {
    id: 2,
    title: "Nebulosa Vermelha",
    director: "IA FutureFlix v5.2",
    duration: "2h 10min",
    year: 2026,
    rating: "4.9",
    genre: "Sci-Fi",
    tags: ["Sci-Fi", "Aventura", "Espaço"],
    image: "/red_nebula.png",
    description: "Uma tripulação de exploradores espaciais cruza o limite do universo conhecido para investigar um misterioso sinal que pulsa do centro de uma estrela moribunda."
  },
  {
    id: 3,
    title: "O Último Alquimista",
    director: "IA FutureFlix v4.9",
    duration: "1h 55min",
    year: 2025,
    rating: "4.7",
    genre: "Fantasia",
    tags: ["Fantasia", "Magia", "Aventura"],
    image: "/the_last_alchemist.png",
    description: "Em um reino medieval futurista onde a magia foi banida, um jovem ferreiro descobre um artefato antigo capaz de transmutar matéria física em pura energia."
  },
  {
    id: 4,
    title: "Eco do Silêncio",
    director: "IA FutureFlix v4.5",
    duration: "1h 38min",
    year: 2026,
    rating: "4.6",
    genre: "Drama",
    tags: ["Drama", "Mistério", "Natureza"],
    image: "/echo_of_silence.png",
    description: "Após um fenômeno cósmico anular todos os sons e eletrônicos da Terra, uma cientista isolada tenta decifrar padrões que se formam nos anéis de crescimento das árvores."
  }
];

export default function Catalogo() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('Todos');
  const [selectedMovie, setSelectedMovie] = useState(null);
  
  const navigate = useNavigate();
  const genres = ['Todos', 'Cyberpunk', 'Sci-Fi', 'Fantasia', 'Drama'];

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

  // Filtrar os filmes com base na busca e no gênero selecionado
  const filteredMovies = movies.filter((movie) => {
    const matchesGenre = selectedGenre === 'Todos' || movie.genre === selectedGenre;
    const matchesSearch = movie.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          movie.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          movie.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesGenre && matchesSearch;
  });

  const handleWatch = (e) => {
    e.stopPropagation();
    // Navega para a página do player
    navigate('/player');
  };

  return (
    <div className="catalogo-page">
      <Header />
      
      <main className="catalogo-content">
        <div className="catalogo-header">
          <div className="catalogo-title-section">
            <h1>Filmes Gerados pela Comunidade</h1>
            <p>Explore as produções cinematográficas mais criativas criadas por Inteligência Artificial.</p>
          </div>

          <div className="catalogo-filters-bar">
            {/* Barra de Busca */}
            <div className="search-container">
              <svg className="search-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8"></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
              </svg>
              <input 
                type="text" 
                placeholder="Buscar por título, descrição ou tags..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="search-input"
              />
              {searchQuery && (
                <button className="clear-search" onClick={() => setSearchQuery('')}>×</button>
              )}
            </div>

            {/* Filtros de Gênero */}
            <div className="genre-pills">
              {genres.map((genre) => (
                <button
                  key={genre}
                  className={`genre-pill ${selectedGenre === genre ? 'active' : ''}`}
                  onClick={() => setSelectedGenre(genre)}
                >
                  {genre}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Grade de Filmes */}
        {filteredMovies.length > 0 ? (
          <div className="movies-grid">
            {filteredMovies.map((movie) => (
              <div 
                key={movie.id} 
                className="movie-card"
                onClick={() => setSelectedMovie(movie)}
              >
                <div className="movie-card-poster-wrapper">
                  <img src={movie.image} alt={`Poster de ${movie.title}`} className="movie-card-image" />
                  <div className="movie-card-overlay">
                    <button className="play-hover-btn" onClick={handleWatch}>
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
        ) : (
          <div className="no-results-state">
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10"></circle>
              <line x1="8" y1="12" x2="16" y2="12"></line>
            </svg>
            <h3>Nenhum filme encontrado</h3>
            <p>Tente alterar os filtros de busca ou a palavra-chave digitada.</p>
          </div>
        )}
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
