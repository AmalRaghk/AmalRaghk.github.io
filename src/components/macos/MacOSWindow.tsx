import React, { useState } from 'react';

interface MacOSWindowProps {
  title: string;
  children: React.ReactNode;
  onClose: () => void;
  onMinimize: () => void;
  onMaximize: () => void;
}

const MacOSWindow: React.FC<MacOSWindowProps> = ({ 
  title, 
  children, 
  onClose, 
  onMinimize, 
  onMaximize 
}) => {
  const [isMaximized, setIsMaximized] = useState(false);

  const handleMaximize = () => {
    setIsMaximized(!isMaximized);
    onMaximize();
  };

  return (
    <div className={`absolute bg-white border border-gray-400 shadow-lg overflow-hidden ${
      isMaximized ? 'inset-2 top-8' : 'top-16 left-16 w-4/5 h-4/5'
    } transition-all duration-300`}>
      {/* Window Header */}
      <div className="bg-gray-100 border-b border-gray-300 h-6 flex items-center justify-between px-3">
        <div className="flex items-center space-x-2">
          <button 
            onClick={onClose}
            className="w-3 h-3 bg-red-500 rounded-full hover:bg-red-600 transition-colors border border-red-600"
          />
          <button 
            onClick={onMinimize}
            className="w-3 h-3 bg-yellow-500 rounded-full hover:bg-yellow-600 transition-colors border border-yellow-600"
          />
          <button 
            onClick={handleMaximize}
            className="w-3 h-3 bg-green-500 rounded-full hover:bg-green-600 transition-colors border border-green-600"
          />
        </div>
        <h2 className="text-xs font-medium text-gray-700 capitalize">{title}</h2>
        <div className="w-12"></div>
      </div>

      {/* Window Content */}
      <div className="h-full overflow-hidden">
        {children}
      </div>
    </div>
  );
};

export default MacOSWindow;