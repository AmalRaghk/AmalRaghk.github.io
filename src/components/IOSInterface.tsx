import React, { useState, useEffect } from 'react';
import { useApp } from '../contexts/AppContext';
import IOSHomeScreen from './ios/IOSHomeScreen';
import IOSStatusBar from './ios/IOSStatusBar';
import IOSControlCenter from './ios/IOSControlCenter';
import IOSNotifications from './ios/IOSNotifications';
import AppContainer from './apps/AppContainer';

const IOSInterface: React.FC = () => {
  const { currentApp, setCurrentApp } = useApp();
  const [showControlCenter, setShowControlCenter] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleHomeButton = () => {
    setCurrentApp(null);
    setShowControlCenter(false);
    setShowNotifications(false);
  };

  const handleSwipeUp = () => {
    setShowControlCenter(true);
  };

  const handleSwipeDown = () => {
    setShowNotifications(true);
  };

  return (
    <div className="relative w-full h-screen bg-black flex items-center justify-center">
      {/* iPhone Frame */}
      <div className="relative w-full max-w-sm h-full max-h-[800px] bg-black rounded-[2.5rem] p-2 shadow-2xl">
        <div className="relative w-full h-full bg-gray-900 rounded-[2rem] overflow-hidden">
          
          {/* Notch */}
          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-32 h-6 bg-black rounded-b-2xl z-50"></div>

          {/* Status Bar */}
          <IOSStatusBar time={currentTime} />

          {/* Main Content Area */}
          <div className="relative w-full h-full pt-8 pb-20">
            {currentApp ? (
              <div className="w-full h-full">
                <AppContainer />
              </div>
            ) : (
              <IOSHomeScreen />
            )}
          </div>

          {/* Control Center */}
          {showControlCenter && (
            <IOSControlCenter onClose={() => setShowControlCenter(false)} />
          )}

          {/* Notifications */}
          {showNotifications && (
            <IOSNotifications onClose={() => setShowNotifications(false)} />
          )}

          {/* Home Indicator */}
          <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 w-32 h-1 bg-white rounded-full opacity-60"></div>

          {/* Gesture Areas */}
          <div 
            className="absolute bottom-0 left-0 right-0 h-16 z-40"
            onTouchStart={handleSwipeUp}
            onClick={handleHomeButton}
          ></div>

          <div 
            className="absolute top-8 left-0 right-0 h-12 z-20"
            onTouchStart={handleSwipeDown}
            onClick={handleSwipeDown}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default IOSInterface;