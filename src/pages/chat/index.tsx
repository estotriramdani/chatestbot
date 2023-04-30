import React, { useContext } from 'react';
import { Inter } from 'next/font/google';
import IniChatScreen from '@/components/IniChatScreen';
import Sidebar from '@/components/layouts/Sidebar';
import HeaderMobile from '@/components/layouts/HeaderMobile';
import ChatForm from '@/components/ChatForm';
import { DUMMY_CHATS } from '../chatbot';
import ChatBubble from '@/components/ChatBubble';

const inter = Inter({ subsets: ['latin'] });

export default function ChatPage() {
  return (
    <div className={`${inter.className}text-gray-800 dark:text-gray-50 lg:flex h-screen`}>
      <HeaderMobile />

      <Sidebar />

      <div className="flex-1 bg-gray-50 lg:h-screen dark:bg-gray-800">
        <div className="flex items-center justify-center h-screen">
          {/* <IniChatScreen /> */}
          <div className="flex flex-col w-full h-screen gap-3 px-4 pt-20 lg:pt-3">
            {DUMMY_CHATS().map((chat, index) => (
              <ChatBubble
                item={chat}
                isAnimated={index === DUMMY_CHATS().length - 1 && chat.sender === 'assistant'}
                key={chat.id}
              />
            ))}
          </div>
        </div>

        <div className="fixed bottom-0 right-0 z-10 w-full bg-white lg:w-3/4 dark:bg-gray-900">
          <ChatForm />
        </div>
      </div>
    </div>
  );
}
