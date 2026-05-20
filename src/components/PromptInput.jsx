import './PromptInput.css';

export default function PromptInput({ value, onChange, onSubmit, isGenerating }) {
  return (
    <div className={`prompt-container ${isGenerating ? 'generating' : ''}`}>
      {isGenerating ? (
        <textarea 
          className="prompt-input multiline" 
          value={value}
          readOnly
        />
      ) : (
        <input 
          type="text" 
          className="prompt-input" 
          placeholder="Um detetive noir em uma cidade cyberpunk..."
          value={value}
          onChange={onChange}
          onKeyDown={(e) => e.key === 'Enter' && onSubmit()}
        />
      )}
      <button 
        className="prompt-submit-btn" 
        onClick={onSubmit}
        disabled={isGenerating}
      >
        {isGenerating ? 'Enviado ↑' : 'Criar ↑'}
      </button>
    </div>
  );
}
