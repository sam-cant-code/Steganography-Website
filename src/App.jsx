import React from 'react';
import { AppProvider, useAppContext } from './context/AppContext';
import Sidebar from './components/Sidebar';
import MainContent from './components/MainContent';

const App = () => {
  return (
    <AppProvider>
      <div className="min-h-screen bg-gray-900 text-gray-200 flex">
        <Sidebar />
        <MainContent />
      </div>
    </AppProvider>
  );
};

export default App;