import './Input.css';

export default function Input({ label, id, type = 'text', placeholder, ...props }) {
  return (
    <div className="input-group">
      {label && <label htmlFor={id}>{label}</label>}
      <input 
        id={id}
        type={type} 
        placeholder={placeholder} 
        className="custom-input"
        {...props}
      />
    </div>
  );
}
