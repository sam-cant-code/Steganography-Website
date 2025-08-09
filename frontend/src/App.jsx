import React from 'react';
import { AppProvider, useAppContext } from './context/AppContext';
import EncodeSection from './components/EncodeSection';
import DecodeSection from './components/DecodeSection';

// The main layout component which consumes the context for displaying errors.
const AppLayout = () => {
  const { error } = useAppContext();

  return (
    <div className="min-h-screen bg-gray-900 text-gray-200 font-sans">
      <header className="py-6 bg-gray-900/80 backdrop-blur-sm border-b border-gray-700">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-4xl font-extrabold text-white">Steganography Suite</h1>
          <p className="mt-2 text-lg text-cyan-400">Hide your secrets in plain sight.</p>
        </div>
      </header>
      
      <main className="container mx-auto p-6 space-y-8">
        {error && (
          <div className="bg-red-900/50 border border-red-700 text-red-300 p-4 rounded-lg" role="alert">
            <p><span className="font-bold">Error:</span> {error}</p>
          </div>
        )}
        
        <EncodeSection />
        <DecodeSection />
      </main>
      
      <footer className="text-center p-6 text-gray-500">
        <p>Built with React, Tailwind CSS, and Context API.</p>
      </footer>
    </div>
  );
}


// The main App component that provides the context.
export default function App() {
  return (
    <AppProvider>
      <AppLayout />
    </AppProvider>
  );
}