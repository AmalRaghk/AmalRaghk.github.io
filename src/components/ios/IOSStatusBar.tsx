import React from 'react';
import { Signal, Wifi, Battery } from 'lucide-react';

interface IOSStatusBarProps {
  time: Date;
}

const IOSStatusBar: React.FC<IOSStatusBarProps> = ({ time }) => {
  const timeString = time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  return (
    <div className="absolute top-0 left-0 right-0 h-8 flex items-center justify-between px-6 text-white text-sm font-semibold z-50 bg-transparent">
      <div className="flex items-center space-x-1">
        <span>{timeString}</span>
      </div>
      
      <div className="flex items-center space-x-1">
        <Signal className="w-4 h-4" />
        <Wifi className="w-4 h-4" />
        <div className="flex items-center space-x-1">
          <Battery className="w-4 h-4" />
          <span className="text-xs">100%</span>
        </div>
      </div>
    </div>
  );
};

export default IOSStatusBar;