import './TagPill.css';

export default function TagPill({ label, selected, onClick }) {
  return (
    <button 
      type="button" 
      className={`tag-pill ${selected ? 'selected' : ''}`}
      onClick={onClick}
    >
      {selected && <span className="checkmark">✓</span>}
      {label}
    </button>
  );
}
