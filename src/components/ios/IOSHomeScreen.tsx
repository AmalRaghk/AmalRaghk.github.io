import React from 'react';
import { useApp } from '../../contexts/AppContext';
import { Mail, Github, Linkedin, Instagram, Camera, Settings, Globe, MessageSquare, Phone, Music, Calculator, Clock } from 'lucide-react';

const IOSHomeScreen: React.FC = () => {
  const { setCurrentApp } = useApp();

  const apps = [
    { name: 'Phone', icon: Phone, color: 'bg-green-500', id: 'phone' },
    { name: 'Mail', icon: Mail, color: 'bg-blue-500', id: 'gmail' },
    { name: 'Safari', icon: Globe, color: 'bg-blue-400', id: 'safari' },
    { name: 'Music', icon: Music, color: 'bg-red-500', id: 'music' },
    { name: 'Messages', icon: MessageSquare, color: 'bg-green-500', id: 'messages' },
    { name: 'GitHub', icon: Github, color: 'bg-gray-800', id: 'github' },
    { name: 'LinkedIn', icon: Linkedin, color: 'bg-blue-700', id: 'linkedin' },
    { name: 'Instagram', icon: Instagram, color: 'bg-pink-500', id: 'instagram' },
    { name: 'Camera', icon: Camera, color: 'bg-gray-600', id: 'camera' },
    { name: 'Settings', icon: Settings, color: 'bg-gray-500', id: 'settings' },
    { name: 'Calculator', icon: Calculator, color: 'bg-gray-800', id: 'calculator' },
    { name: 'Clock', icon: Clock, color: 'bg-black', id: 'clock' },
  ];

  const handleAppClick = (appId: string) => {
    if (['gmail', 'github', 'linkedin', 'instagram'].includes(appId)) {
      setCurrentApp(appId);
    }
  };

  return (
    <div className="relative w-full h-full bg-black p-6">
      {/* Wallpaper */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900 via-purple-900 to-black"></div>

      {/* Time Display */}
      <div className="relative z-10 text-center mb-8 pt-4">
        <div className="text-white text-6xl font-thin">
          {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </div>
        <div className="text-white text-lg font-light opacity-80">
          {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
        </div>
      </div>

      {/* App Grid */}
      <div className="relative z-10 grid grid-cols-4 gap-4 px-2">
        {apps.map((app) => (
          <div
            key={app.id}
            className="flex flex-col items-center space-y-2 cursor-pointer transform transition-transform duration-200 active:scale-95"
            onClick={() => handleAppClick(app.id)}
          >
            <div className={`w-16 h-16 rounded-2xl ${app.color} flex items-center justify-center shadow-lg border border-gray-600`}>
              <app.icon className="w-8 h-8 text-white" />
            </div>
            <span className="text-white text-xs font-medium text-center leading-tight">{app.name}</span>
          </div>
        ))}
      </div>

      {/* Page Dots */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-2">
        <div className="w-2 h-2 bg-white rounded-full"></div>
        <div className="w-2 h-2 bg-white rounded-full opacity-50"></div>
        <div className="w-2 h-2 bg-white rounded-full opacity-50"></div>
      </div>
    </div>
  );
};

export default IOSHomeScreen;