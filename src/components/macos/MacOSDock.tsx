import React from 'react';
import { useApp } from '../../contexts/AppContext';
import { Mail, Github, Linkedin, Instagram, Folder, Trash2, Globe, Terminal } from 'lucide-react';

const MacOSDock: React.FC = () => {
  const { setCurrentApp } = useApp();

  const apps = [
    { name: 'Finder', icon: Folder, id: 'finder', color: 'bg-blue-500' },
    { name: 'Safari', icon: Globe, id: 'safari', color: 'bg-blue-400' },
    { name: 'Mail', icon: Mail, id: 'gmail', color: 'bg-blue-600' },
    { name: 'GitHub', icon: Github, id: 'github', color: 'bg-gray-800' },
    { name: 'LinkedIn', icon: Linkedin, id: 'linkedin', color: 'bg-blue-700' },
    { name: 'Instagram', icon: Instagram, id: 'instagram', color: 'bg-pink-500' },
    { name: 'Terminal', icon: Terminal, id: 'terminal', color: 'bg-gray-700' },
    { name: 'Trash', icon: Trash2, id: 'trash', color: 'bg-gray-600' },
  ];

  const handleAppClick = (appId: string) => {
    if (['gmail', 'github', 'linkedin', 'instagram'].includes(appId)) {
      setCurrentApp(appId);
    }
  };

  return (
    <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 z-50">
      <div className="bg-gray-200 bg-opacity-90 border border-gray-300 rounded-lg p-2 flex items-center space-x-1">
        {apps.map((app) => (
          <div
            key={app.id}
            className={`w-12 h-12 ${app.color} rounded-lg flex items-center justify-center cursor-pointer transform transition-all duration-200 hover:scale-110 border border-gray-400`}
            onClick={() => handleAppClick(app.id)}
            title={app.name}
          >
            <app.icon className="w-6 h-6 text-white" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default MacOSDock;