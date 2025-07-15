import React from 'react';
import { Folder, FileText, HardDrive } from 'lucide-react';

const MacOSDesktop: React.FC = () => {
  const desktopItems = [

    { name: 'ReadMe.txt', icon: FileText, x: 20, y: 40 },
  ];

  return (
    <div className="absolute inset-0 top-6 bottom-16">
      {desktopItems.map((item) => (
        <div
          key={item.name}
          className="absolute flex flex-col items-center space-y-1 cursor-pointer hover:bg-blue-400 hover:bg-opacity-30 p-2 rounded-lg transition-colors duration-200"
          style={{ left: item.x, top: item.y }}
        >
          <item.icon className="w-10 h-10 text-white drop-shadow-lg" />
          <span className="text-white text-xs text-center drop-shadow-lg">{item.name}</span>
        </div>
      ))}
    </div>
  );
};

export default MacOSDesktop;