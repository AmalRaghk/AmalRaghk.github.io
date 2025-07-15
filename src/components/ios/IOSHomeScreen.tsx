import React from 'react';
import { useApp } from '../../contexts/AppContext';
import { Mail, Briefcase, CircleUser, Camera,Music, Calculator, FolderGit } from 'lucide-react';

const IOSHomeScreen: React.FC = () => {
  const { setCurrentApp } = useApp();

  const apps = [
    { name: 'Cotact Me', icon: Mail, color: 'bg-blue-500', id: 'contact' },
    { name: 'Music', icon: Music, color: 'bg-red-500', id: 'music' },
    { name: 'Projects', icon: FolderGit, color: 'bg-gray-800', id: 'project' },
    { name: 'Experiences', icon: Briefcase, color: 'bg-blue-700', id: 'experience' },
    { name: 'About', icon: CircleUser, color: 'bg-pink-500', id: 'about' },
    { name: 'Camera', icon: Camera, color: 'bg-gray-600', id: 'camera' },
    { name: 'Calculator', icon: Calculator, color: 'bg-gray-800', id: 'calculator' },
  ];

  const handleAppClick = (appId: string) => {
    if (['contact', 'project', 'experience', 'about'].includes(appId)) {
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

    </div>
  );
};

export default IOSHomeScreen;