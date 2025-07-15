import React from 'react';
import { useApp } from '../../contexts/AppContext';
import { Mail,  Briefcase,CircleUser,  FolderGit } from 'lucide-react';

const MacOSDock: React.FC = () => {
  const { setCurrentApp } = useApp();

  const apps = [
    { name: 'Mail', icon: Mail, id: 'contact', color: 'bg-blue-600' },
    { name: 'Projects', icon: FolderGit, id: 'project', color: 'bg-gray-800' },
    { name: 'Experiences', icon: Briefcase, id: 'experience', color: 'bg-blue-700' },
    { name: 'About', icon: CircleUser, id: 'about', color: 'bg-pink-500' },
  ];

  const handleAppClick = (appId: string) => {
    if (['contact', 'project', 'experience', 'about'].includes(appId)) {
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