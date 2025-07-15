import React from 'react';
import { useApp } from '../../contexts/AppContext';
import { useMediaQuery } from '../../hooks/useMediaQuery';
import ProjectsApp from './ProjectsApp';
import ExperienceApp from './ExperienceApp';
import ContactApp from './ContactApp';
import AboutApp from './AboutApp';

const AppContainer: React.FC = () => {
  const { currentApp } = useApp();
  const isMobile = useMediaQuery('(max-width: 768px)');

  const renderApp = () => {
    switch (currentApp) {
      case 'contact':
        return <ContactApp />;
      case 'project':
        return <ProjectsApp />;
      case 'experience':
        return <ExperienceApp />;
      case 'about':
        return <AboutApp />;
      default:
        return (
          <div className="flex items-center justify-center h-full text-gray-500 bg-white">
            <div className="text-center">
              <p className="text-lg mb-2">App not found</p>
              <p className="text-sm">Please select a valid app</p>
            </div>
          </div>
        );
    }
  };

  return (
    <div className={`relative z-40 w-full h-full bg-white overflow-hidden ${isMobile ? 'rounded-none' : 'rounded-lg'}`}>
      {renderApp()}
    </div>
  );
};

export default AppContainer;