import React, { useState, useEffect } from 'react';
import { useMediaQuery } from './hooks/useMediaQuery';
import IOSInterface from './components/IOSInterface';
import MacOSInterface from './components/MacOSInterface';
import { AppProvider } from './contexts/AppContext';

function App() {
  const isMobile = useMediaQuery('(max-width: 768px)');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate boot loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 mx-auto mb-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
          <p className="text-white text-sm font-light">
            {isMobile ? 'Starting iOS...' : 'Starting macOS...'}
          </p>
        </div>
      </div>
    );
  }

  return (
    <AppProvider>
      <div className="min-h-screen overflow-hidden">
        {isMobile ? <IOSInterface /> : <MacOSInterface />}
      </div>
    </AppProvider>
  );
}

export default App;