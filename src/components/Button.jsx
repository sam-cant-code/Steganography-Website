import React from 'react';

/**
 * A reusable, styled button component.
 * @param {object} props - Component props.
 * @param {function} props.onClick - The function to call when the button is clicked.
 * @param {boolean} [props.disabled=false] - Whether the button should be disabled.
 * @param {React.ReactNode} props.children - The content to display inside the button.
 * @param {string} [props.className] - Additional classes for styling.
 */
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