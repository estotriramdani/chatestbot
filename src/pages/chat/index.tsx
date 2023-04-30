import React from 'react';
import { Inter } from 'next/font/google';
import IniChatScreen from '@/components/IniChatScreen';
import Sidebar from '@/components/layouts/Sidebar';
import HeaderMobile from '@/components/layouts/HeaderMobile';
import ChatForm from '@/components/ChatForm';
import { DUMMY_CHATS } from '../chatbot';
import ChatBubble from '@/components/ChatBubble';
import ConversationScreen from '@/components/ConversationScreen';

const inter = Inter({ subsets: ['latin'] });

export default function ChatPage() {
  return (
    <div className={`${inter.className}text-gray-700 dark:text-gray-50 lg:flex h-screen`}>
      <HeaderMobile />

      <Sidebar />

      <div className="flex-1 bg-gray-50 lg:h-screen dark:bg-gray-800">
        <ConversationScreen />

        <div className="fixed bottom-0 right-0 z-10 w-full bg-white lg:w-3/4 dark:bg-gray-900">
          <ChatForm />
        </div>
      </div>
    </div>
  );
}
