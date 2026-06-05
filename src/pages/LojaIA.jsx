import React from 'react';
import './LojaIA.css';

const MOCK_MOVIES = [
  {
    id: 1,
    title: "Synthesis: The Age of AI",
    creator: "Elena Rodriguez",
    profit: "$1.2M",
    image: "/posters/sci_fi_poster_1780613829627.png",
    genre: "Sci-Fi Epic",
    description: "Em um mundo dividido pelo intelecto e pela vida, a consciência artificial desperta."
  },
  {
    id: 2,
    title: "Neon Requiem",
    creator: "Marcus Chen",
    profit: "$850K",
    image: "/posters/cyberpunk_poster_1780613842652.png",
    genre: "Cyberpunk Thriller",
    description: "A justiça arde nas sombras das ruas chuvosas de Neo-Kyoto."
  },
  {
    id: 3,
    title: "The Shadow of Aetheria",
    creator: "Sophia Sterling",
    profit: "$2.4M",
    image: "/posters/fantasy_poster_1780613852771.png",
    genre: "High Fantasy",
    description: "A união prevalecerá. A escuridão cairá. O amuleto eterno aguarda."
  }
];

function LojaIA() {
  return (
    <div className="loja-ia-container">
      <header className="loja-ia-header">
        <h1>FutureFlix AI Studio</h1>
        <p>Marketplace premium de filmes gerados 100% por Inteligência Artificial</p>
      </header>

      <main className="loja-ia-grid">
        {MOCK_MOVIES.map(movie => (
          <div key={movie.id} className="movie-card">
            <div className="movie-image-wrapper">
              <img src={movie.image} alt={movie.title} className="movie-image" />
              <div className="movie-genre-badge">{movie.genre}</div>
            </div>
            
            <div className="movie-content">
              <h2>{movie.title}</h2>
              <p className="movie-description">{movie.description}</p>
              
              <div className="movie-stats">
                <div className="stat-item">
                  <span className="stat-label">Criador(a) AI</span>
                  <span className="stat-value creator">{movie.creator}</span>
                </div>
                <div className="stat-item">
                  <span className="stat-label">Lucro Gerado</span>
                  <span className="stat-value profit">{movie.profit}</span>
                </div>
              </div>
              
              <button className="buy-btn">Adquirir Direitos de Exibição</button>
            </div>
          </div>
        ))}
      </main>
    </div>
  );
}

export default LojaIA;
