import './Input.css';

export default function Input({ label, id, type = 'text', placeholder, rightElement, ...props }) {
  return (
    <div className="input-group">
      {label && <label htmlFor={id}>{label}</label>}
      <div className="input-wrapper" style={{ position: 'relative', width: '100%' }}>
        <input 
          id={id}
          type={type} 
          placeholder={placeholder} 
          className="custom-input"
          style={rightElement ? { paddingRight: '48px' } : {}}
          {...props}
        />
        {rightElement && (
          <div className="input-right-element" style={{
            position: 'absolute',
            right: '12px',
            top: '50%',
            transform: 'translateY(-50%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            zIndex: 2
          }}>
            {rightElement}
          </div>
        )}
      </div>
    </div>
  );
}
