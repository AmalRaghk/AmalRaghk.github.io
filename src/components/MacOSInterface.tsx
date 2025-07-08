import React, { useState, useEffect } from 'react';
import { useApp } from '../contexts/AppContext';
import MacOSDock from './macos/MacOSDock';
import MacOSMenuBar from './macos/MacOSMenuBar';
import MacOSDesktop from './macos/MacOSDesktop';
import MacOSWindow from './macos/MacOSWindow';
import AppContainer from './apps/AppContainer';

const MacOSInterface: React.FC = () => {
  const { currentApp, setCurrentApp } = useApp();
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleCloseApp = () => {
    setCurrentApp(null);
  };

  return (
    <div className="relative w-full h-screen bg-blue-500 overflow-hidden">
      {/* Desktop Background - Classic macOS Blue */}
      <div className="absolute inset-0 bg-gradient-to-b from-blue-400 to-blue-600"></div>
      
      {/* Menu Bar */}
      <MacOSMenuBar time={currentTime} />

      {/* Desktop */}
      <MacOSDesktop />

      {/* App Windows */}
      {currentApp && (
        <MacOSWindow
          title={currentApp}
          onClose={handleCloseApp}
          onMinimize={() => setCurrentApp(null)}
          onMaximize={() => {}}
        >
          <AppContainer />
        </MacOSWindow>
      )}

      {/* Dock */}
      <MacOSDock />
    </div>
  );
};

export default MacOSInterface;