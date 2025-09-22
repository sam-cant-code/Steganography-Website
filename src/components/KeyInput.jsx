import React, { useState } from 'react';
import Input from './Input';

const KeyInput = ({ value, onChange, placeholder }) => {
  const [showKey, setShowKey] = useState(false);
  
  return (
    <div className="relative max-w-xs w-full">
      <Input
        type={showKey ? 'text' : 'password'}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="pr-8 w-full"
      />
      <button
        type="button"
        onClick={() => setShowKey(!showKey)}
        className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-200 text-xs"
      >
        {showKey ? '👁️' : '🔒'}
      </button>
    </div>
  );
};

export default KeyInput;