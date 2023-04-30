import { THEME_KEY } from '@/constants';
import { createContext, useEffect, useState } from 'react';

interface IGlobalContext {
  setShowSidebar: React.Dispatch<React.SetStateAction<boolean>>;
  showSidebar: boolean;
  setTheme: React.Dispatch<React.SetStateAction<string>>;
  theme: string;
}

const GlobalContext = createContext<IGlobalContext>({
  setShowSidebar: () => {},
  showSidebar: false,
  setTheme: () => {},
  theme: 'light',
});

export const GlobalContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [showSidebar, setShowSidebar] = useState(false);
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    const theme = localStorage.getItem(THEME_KEY);
    if (!theme) {
      localStorage.setItem(THEME_KEY, 'light');
    } else {
      if (theme === 'dark') {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    }
  }, []);

  return (
    <GlobalContext.Provider value={{ showSidebar, setShowSidebar, theme, setTheme }}>
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalContext;
