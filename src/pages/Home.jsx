import { useState } from 'react';
import Header from '../components/Header';
import PromptInput from '../components/PromptInput';
import TagPill from '../components/TagPill';
import GenerationStatus from '../components/GenerationStatus';
import { apiFetch } from '../services/api';
import './Home.css';

export default function Home() {
  const [prompt, setPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [movieId, setMovieId] = useState(null);
  const [errorMsg, setErrorMsg] = useState('');

  // Estado para os gêneros e estilos selecionados
  const [selectedGenres, setSelectedGenres] = useState(['drama', 'aventura']);
  const [selectedStyle, setSelectedStyle] = useState('animação');

  const genres = ['ação', 'drama', 'aventura', 'sci-fi', 'suspense'];
  const styles = ['realista', 'animação', 'sci-fi', 'cyberpunk', 'noir'];

  const toggleGenre = (genre) => {
    if (isGenerating) return; // Não permitir mudar durante a geração
    if (selectedGenres.includes(genre)) {
      setSelectedGenres(selectedGenres.filter(g => g !== genre));
    } else {
      setSelectedGenres([...selectedGenres, genre]);
    }
  };

  const handleCreate = async () => {
    if (!prompt.trim() || isGenerating) return;
    setErrorMsg('');
    
    try {
      // 1. Envia a solicitação de geração para a API do backend
      const data = await apiFetch('/movies/generate', {
        method: 'POST',
        body: JSON.stringify({
          prompt,
          genres: selectedGenres,
          style: selectedStyle
        })
      });
      
      // 2. Salva o ID do filme criado e ativa a tela de progresso
      setMovieId(data.id);
      setIsGenerating(true);
    } catch (err) {
      setErrorMsg(err.message || 'Falha ao iniciar a geração do filme. Tente novamente.');
      console.error(err);
    }
  };

  return (
    <div className="home-page">
      <Header />
      
      <main className="studio-content">
        {errorMsg && (
          <div style={{ maxWidth: '600px', margin: '0 auto 20px auto', padding: '12px', background: 'rgba(229,62,62,0.1)', border: '1px solid rgba(229,62,62,0.3)', color: '#fc8181', borderRadius: '8px', textAlign: 'center', fontSize: '14px' }}>
            ⚠️ {errorMsg}
          </div>
        )}

        <div className="studio-header">
          {isGenerating ? (
            <GenerationStatus movieId={movieId} />
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
