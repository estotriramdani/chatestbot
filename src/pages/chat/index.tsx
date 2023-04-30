import React from 'react';
import { Inter } from 'next/font/google';
import Sidebar from '@/components/layouts/Sidebar';
import HeaderMobile from '@/components/layouts/HeaderMobile';
import ChatForm from '@/components/ChatForm';
import ConversationScreen from '@/components/ConversationScreen';

const inter = Inter({ subsets: ['latin'] });

export default function ChatPage() {
  return (
    <div className={`${inter.className}text-gray-700 dark:text-gray-50 lg:flex max-h-screen`}>
      <HeaderMobile />

      <Sidebar />

      <div className="max-h-screen lg:flex-1 bg-gray-50 lg:h-screen dark:bg-gray-800">
        <ConversationScreen />
      </div>
      <div className="fixed bottom-0 right-0 z-10 w-full bg-white lg:w-3/4 dark:bg-gray-900">
        <ChatForm />
      </div>
    </div>
  );
}
