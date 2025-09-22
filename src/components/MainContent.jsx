import React from 'react';
import { useAppContext } from '../context/AppContext';
import EncodePanel from './EncodePanel';
import DecodePanel from './DecodePanel';

const MainContent = () => {
  const { activeTab, error } = useAppContext();

  return (
    <div className="flex-1 p-6">
      {error && (
        <div className="mb-4 p-3 bg-red-900/50 border border-red-700 text-red-300 rounded text-sm">
          {error}
        </div>
      )}
      
      {activeTab === 'encode' ? <EncodePanel /> : <DecodePanel />}
    </div>
  );
};

export default MainContent;