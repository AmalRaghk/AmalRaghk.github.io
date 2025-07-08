import React, { createContext, useContext, useState, ReactNode } from 'react';

interface AppContextType {
  currentApp: string | null;
  setCurrentApp: (app: string | null) => void;
  appData: any;
  setAppData: (data: any) => void;
  isAppMinimized: boolean;
  setIsAppMinimized: (minimized: boolean) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};

interface AppProviderProps {
  children: ReactNode;
}

export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  const [currentApp, setCurrentApp] = useState<string | null>(null);
  const [appData, setAppData] = useState<any>({});
  const [isAppMinimized, setIsAppMinimized] = useState(false);

  return (
    <AppContext.Provider
      value={{
        currentApp,
        setCurrentApp,
        appData,
        setAppData,
        isAppMinimized,
        setIsAppMinimized,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};