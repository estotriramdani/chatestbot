import { createContext, useState } from 'react';

interface IGlobalContext {
  setShowSidebar: React.Dispatch<React.SetStateAction<boolean>>;
  showSidebar: boolean;
}

const GlobalContext = createContext<IGlobalContext>({
  setShowSidebar: () => {},
  showSidebar: false,
});

export const GlobalContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [showSidebar, setShowSidebar] = useState(false);

  return (
    <GlobalContext.Provider value={{ showSidebar, setShowSidebar }}>
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalContext;
