import './PromptInput.css';

export default function PromptInput({ value, onChange, onSubmit }) {
  return (
    <div className="prompt-container">
      <input 
        type="text" 
        className="prompt-input" 
        placeholder="Um detetive noir em uma cidade cyberpunk..."
        value={value}
        onChange={onChange}
        onKeyDown={(e) => e.key === 'Enter' && onSubmit()}
      />
      <button className="prompt-submit-btn" onClick={onSubmit}>
        Criar ↑
      </button>
    </div>
  );
}
