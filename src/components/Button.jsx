import React from 'react';

const Button = ({ onClick, disabled = false, children, className = '' }) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`bg-cyan-500 hover:bg-cyan-600 disabled:bg-gray-600 disabled:cursor-not-allowed text-white font-bold py-2 px-4 rounded-lg transition-colors duration-200 ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;