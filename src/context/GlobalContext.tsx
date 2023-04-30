import { THEME_KEY } from '@/constants';
import { RAPIConversations } from '@/interfaces';
import { fetcher } from '@/services/fetcher';
import { useSession } from 'next-auth/react';
import { createContext, useEffect, useState } from 'react';
import useSWR, { KeyedMutator } from 'swr';

interface IGlobalContext {
  setShowSidebar: React.Dispatch<React.SetStateAction<boolean>>;
  showSidebar: boolean;
  setTheme: React.Dispatch<React.SetStateAction<string>>;
  theme: string;
  limitChats?: RAPILimitChat;
  mutateLimitChats?: KeyedMutator<RAPILimitChat>;
  conversations?: RAPIConversations;
  mutateConversations?: KeyedMutator<RAPIConversations>;
}

const GlobalContext = createContext<IGlobalContext>({
  setShowSidebar: () => {},
  showSidebar: false,
  setTheme: () => {},
  theme: 'light',
});

export interface RAPILimitChat {
  status: string;
  message: string;
  data: {
    date: string;
    limit: number;
    sentChats: number;
  };
}

export const GlobalContextProvider = ({ children }: { children: React.ReactNode }) => {
  const { data: session } = useSession();
  const [showSidebar, setShowSidebar] = useState(false);
  const [theme, setTheme] = useState('light');

  const { data: limitChats, mutate: mutateLimitChats } = useSWR<RAPILimitChat>(
    `${process.env.NEXT_PUBLIC_URL}/api/chat/limit`,
    session ? () => fetcher(`${process.env.NEXT_PUBLIC_URL}/api/chat/limit`) : null
  );

  const { data: conversations, mutate: mutateConversations } = useSWR<RAPIConversations>(
    `${process.env.NEXT_PUBLIC_URL}/api/conversations`,
    session ? () => fetcher(`${process.env.NEXT_PUBLIC_URL}/api/conversations`) : null
  );

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
    <GlobalContext.Provider
      value={{
        showSidebar,
        setShowSidebar,
        theme,
        setTheme,
        limitChats,
        mutateLimitChats,
        conversations,
        mutateConversations,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalContext;
