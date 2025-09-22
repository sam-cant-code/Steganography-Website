import React from 'react';

const Button = ({ onClick, disabled, children, className = '' }) => (
  <button
    onClick={onClick}
    disabled={disabled}
    className={`px-3 py-1.5 text-sm bg-cyan-500 hover:bg-cyan-600 disabled:bg-gray-600 text-white rounded transition-colors ${className}`}
  >
    {children}
  </button>
);

export default Button;