import './Button.css';

export default function Button({ children, type = 'button', variant = 'primary', className = '', ...props }) {
  return (
    <button 
      type={type} 
      className={`custom-button btn-${variant} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
