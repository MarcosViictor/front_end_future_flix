import { useState } from 'react';
import Header from '../components/Header';
import PromptInput from '../components/PromptInput';
import TagPill from '../components/TagPill';
import GenerationStatus from '../components/GenerationStatus';
import './Home.css';

export default function Home() {
  const [prompt, setPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  
  // Estado para mockar as seleções iniciais
  const [selectedGenres, setSelectedGenres] = useState(['drama', 'aventura']);
  const [selectedStyle, setSelectedStyle] = useState('animação');

  const genres = ['ação', 'drama', 'aventura', 'fantasia', 'suspense'];
  const styles = ['realista', 'animação', 'sci-fi', 'cyberpunk', 'retro-futurista'];

  const toggleGenre = (genre) => {
    if (isGenerating) return; // Não permitir mudar durante a geração
    if (selectedGenres.includes(genre)) {
      setSelectedGenres(selectedGenres.filter(g => g !== genre));
    } else {
      setSelectedGenres([...selectedGenres, genre]);
    }
  };

  const handleCreate = () => {
    if (!prompt.trim() || isGenerating) return;
    
    console.log('Gerando filme com:', { prompt, selectedGenres, selectedStyle });
    setIsGenerating(true);
  };

  return (
    <div className="home-page">
      <Header />
      
      <main className="studio-content">
        <div className="studio-header">
          {isGenerating ? (
            <GenerationStatus />
          ) : (
            <h1>🎬 O que vamos assistir hoje?</h1>
          )}
        </div>

        <div className="prompt-section">
          <PromptInput 
            value={prompt} 
            onChange={(e) => setPrompt(e.target.value)} 
            onSubmit={handleCreate} 
            isGenerating={isGenerating}
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
