import React from 'react';
import { Wifi, Bluetooth, Flashlight, Volume2, Sun, X, Airplay as Airplane, Smartphone } from 'lucide-react';

interface IOSControlCenterProps {
  onClose: () => void;
}

const IOSControlCenter: React.FC<IOSControlCenterProps> = ({ onClose }) => {
  return (
    <div className="absolute inset-0 bg-black bg-opacity-50 flex items-end z-50 animate-slide-up">
      <div className="w-full bg-gray-800 rounded-t-3xl p-6 transform transition-transform duration-300">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-white text-lg font-semibold">Control Center</h2>
          <button onClick={onClose} className="text-white p-2">
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Connectivity Section */}
        <div className="bg-gray-700 rounded-2xl p-4 mb-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-blue-500 rounded-xl p-4 flex flex-col items-center space-y-2">
              <Airplane className="w-6 h-6 text-white" />
              <span className="text-white text-xs font-medium">Airplane Mode</span>
            </div>
            <div className="bg-gray-600 rounded-xl p-4 flex flex-col items-center space-y-2">
              <Smartphone className="w-6 h-6 text-white" />
              <span className="text-white text-xs font-medium">Cellular Data</span>
            </div>
            <div className="bg-blue-500 rounded-xl p-4 flex flex-col items-center space-y-2">
              <Wifi className="w-6 h-6 text-white" />
              <span className="text-white text-xs font-medium">Wi-Fi</span>
            </div>
            <div className="bg-blue-500 rounded-xl p-4 flex flex-col items-center space-y-2">
              <Bluetooth className="w-6 h-6 text-white" />
              <span className="text-white text-xs font-medium">Bluetooth</span>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="bg-gray-700 rounded-2xl p-4 flex flex-col items-center space-y-2">
            <Flashlight className="w-8 h-8 text-white" />
            <span className="text-white text-sm font-medium">Flashlight</span>
          </div>
          <div className="bg-gray-700 rounded-2xl p-4 flex flex-col items-center space-y-2">
            <Volume2 className="w-8 h-8 text-white" />
            <span className="text-white text-sm font-medium">Do Not Disturb</span>
          </div>
        </div>

        {/* Sliders */}
        <div className="space-y-4">
          <div className="bg-gray-700 rounded-2xl p-4">
            <div className="flex items-center space-x-3 mb-2">
              <Sun className="w-5 h-5 text-white" />
              <span className="text-white text-sm">Brightness</span>
            </div>
            <div className="bg-gray-600 rounded-full h-3 relative">
              <div className="bg-white rounded-full h-3 w-3/4 relative">
                <div className="absolute right-0 top-0 w-6 h-6 bg-white rounded-full shadow-lg transform -translate-y-1.5"></div>
              </div>
            </div>
          </div>
          
          <div className="bg-gray-700 rounded-2xl p-4">
            <div className="flex items-center space-x-3 mb-2">
              <Volume2 className="w-5 h-5 text-white" />
              <span className="text-white text-sm">Volume</span>
            </div>
            <div className="bg-gray-600 rounded-full h-3 relative">
              <div className="bg-white rounded-full h-3 w-1/2 relative">
                <div className="absolute right-0 top-0 w-6 h-6 bg-white rounded-full shadow-lg transform -translate-y-1.5"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IOSControlCenter;