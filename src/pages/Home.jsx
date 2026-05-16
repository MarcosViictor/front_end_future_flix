import { useState } from 'react';
import Header from '../components/Header';
import PromptInput from '../components/PromptInput';
import TagPill from '../components/TagPill';
import './Home.css';

export default function Home() {
  const [prompt, setPrompt] = useState('');
  
  // Estado para mockar as seleções iniciais
  const [selectedGenres, setSelectedGenres] = useState(['drama', 'aventura']);
  const [selectedStyle, setSelectedStyle] = useState('animação');

  const genres = ['ação', 'drama', 'aventura', 'ação', 'ação']; // Repetidos como na imagem
  const styles = ['realista', 'animação', 'sci-fi', 'sci-fi', 'sci-fi'];

  const toggleGenre = (genre) => {
    if (selectedGenres.includes(genre)) {
      setSelectedGenres(selectedGenres.filter(g => g !== genre));
    } else {
      setSelectedGenres([...selectedGenres, genre]);
    }
  };

  const handleCreate = () => {
    console.log('Gerando filme com:', { prompt, selectedGenres, selectedStyle });
    // TODO: Redirecionar para o Player no futuro
  };

  return (
    <div className="home-page">
      <Header />
      
      <main className="studio-content">
        <div className="studio-header">
          <h1>🎬 O que vamos assistir hoje?</h1>
        </div>

        <div className="prompt-section">
          <PromptInput 
            value={prompt} 
            onChange={(e) => setPrompt(e.target.value)} 
            onSubmit={handleCreate} 
          />
        </div>

        <div className="tags-section">
          <div className="tags-group">
            <h3>Defina o gênero do seu filme</h3>
            <div className="tags-row">
              {genres.map((genre, idx) => (
                <TagPill 
                  key={`genre-${idx}`} 
                  label={genre} 
                  selected={selectedGenres.includes(genre)}
                  onClick={() => toggleGenre(genre)}
                />
              ))}
            </div>
          </div>

          <div className="tags-group">
            <h3>Estilo visual</h3>
            <div className="tags-row">
              {styles.map((style, idx) => (
                <TagPill 
                  key={`style-${idx}`} 
                  label={style} 
                  selected={selectedStyle === style}
                  onClick={() => setSelectedStyle(style)}
                />
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
