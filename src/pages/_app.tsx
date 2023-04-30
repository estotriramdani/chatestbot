import type { AppProps } from 'next/app';
import { SessionProvider } from 'next-auth/react';
import { Toaster } from 'react-hot-toast';

import '@/styles/globals.css';
import { GlobalContextProvider } from '@/context/GlobalContext';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <SessionProvider session={pageProps.session}>
      <GlobalContextProvider>
        <Component {...pageProps} />
      </GlobalContextProvider>
      <Toaster />
    </SessionProvider>
  );
}
