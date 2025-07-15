import React from 'react';
import { Apple, Wifi, Volume2, Battery } from 'lucide-react';
import logo from '../../../public/logo.svg';
interface MacOSMenuBarProps {
  time: Date;
}

const MacOSMenuBar: React.FC<MacOSMenuBarProps> = ({ time }) => {
  const timeString = time.toLocaleString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });

  return (
    <div className="absolute top-0 left-0 right-0 h-6 bg-gray-200 border-b border-gray-300 flex items-center justify-between px-4 text-black text-sm z-50">
       <div className="flex items-center space-x-2">        
        <img src={logo} alt="logo" className="w-4 h-4" />
        <span className="font-medium">Welcome</span>
      </div>
      
      <div className="flex items-center space-x-3">
        <Wifi className="w-4 h-4" />
        <Volume2 className="w-4 h-4" />
        <Battery className="w-4 h-4" />
        <span className="font-medium">{timeString}</span>
      </div>
    </div>
  );
};

export default MacOSMenuBar;