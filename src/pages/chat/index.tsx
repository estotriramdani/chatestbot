import React, { useContext } from 'react';
import { Inter } from 'next/font/google';
import IniChatScreen from '@/components/IniChatScreen';
import Sidebar from '@/components/layouts/Sidebar';
import HeaderMobile from '@/components/layouts/HeaderMobile';
import ChatForm from '@/components/ChatForm';

const inter = Inter({ subsets: ['latin'] });

export default function ChatPage() {
  return (
    <div className={`${inter.className}text-gray-800 dark:text-gray-50 lg:flex h-screen`}>
      <HeaderMobile />

      <Sidebar />

      <div className="flex-1 lg:h-screen bg-gray-50 dark:bg-gray-800">
        <div className="flex items-center justify-center h-screen">
          <IniChatScreen />
        </div>

        <div className="fixed bottom-0 right-0 z-10 w-full bg-white lg:w-3/4 dark:bg-gray-900">
          <ChatForm />
        </div>
      </div>
    </div>
  );
}
