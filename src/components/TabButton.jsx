import React from 'react';

export const TabButton = ({ isActive, onClick, children }) => {
  return (
    <button
      onClick={onClick}
      className={`px-6 py-3 font-medium rounded-lg transition-all duration-200 ${
        isActive
          ? 'bg-cyan-500 text-white shadow-lg'
          : 'bg-gray-700 text-gray-300 hover:bg-gray-600 hover:text-white'
      }`}
    >
      {children}
    </button>
  );
};