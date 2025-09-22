import React, { useState } from 'react';

const SecretKeyInput = ({ value, onChange, placeholder }) => {
  const [showKey, setShowKey] = useState(false);
  
  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-300">
        🔑 Secret Key (Optional - for encryption)
      </label>
      <div className="relative">
        <input
          type={showKey ? 'text' : 'password'}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className="w-full p-3 pr-12 bg-gray-900 border border-gray-600 rounded-lg text-gray-200 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
        />
        <button
          type="button"
          onClick={() => setShowKey(!showKey)}
          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-200"
        >
          {showKey ? '👁️' : '🔒'}
        </button>
      </div>
      <div className="text-xs text-gray-500">
        {value ? '🔐 Messages will be encrypted' : '🔓 Messages will be stored as plain text'}
      </div>
    </div>
  );
};

export default SecretKeyInput;