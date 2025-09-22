import React from 'react';
import { useAppContext } from '../context/AppContext';

const Sidebar = () => {
  const { activeTab, setActiveTab } = useAppContext();

  return (
    <div className="w-48 bg-gray-800 border-r border-gray-700 flex flex-col">
      <div className="p-4 border-b border-gray-700">
        <h1 className="text-lg font-bold text-white">🔐 Steganography</h1>
        <p className="text-xs text-gray-400 mt-1">Hide secrets in images</p>
      </div>
      
      <div className="flex-1 p-4 space-y-2">
        <button
          onClick={() => setActiveTab('encode')}
          className={`w-full p-3 text-left text-sm rounded transition-colors ${
            activeTab === 'encode'
              ? 'bg-cyan-500 text-white'
              : 'text-gray-300 hover:bg-gray-700'
          }`}
        >
          <div className="font-medium">🔐 Encode</div>
          <div className="text-xs opacity-75">Hide messages</div>
        </button>
        
        <button
          onClick={() => setActiveTab('decode')}
          className={`w-full p-3 text-left text-sm rounded transition-colors ${
            activeTab === 'decode'
              ? 'bg-cyan-500 text-white'
              : 'text-gray-300 hover:bg-gray-700'
          }`}
        >
          <div className="font-medium">🔍 Decode</div>
          <div className="text-xs opacity-75">Reveal messages</div>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;