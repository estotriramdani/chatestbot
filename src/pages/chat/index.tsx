import React, { useState } from 'react';
import {
  Bars3Icon,
  PlusIcon,
  PaperAirplaneIcon,
  TrashIcon,
  MoonIcon,
  UserIcon,
  ArrowLeftIcon,
  PencilIcon,
} from '@heroicons/react/24/outline';
import { Inter } from 'next/font/google';
import IconButton from '@/components/IconButton';
import Image from 'next/image';
import ListButton from '@/components/ListButton';
import IniChatScreen from '@/components/IniChatScreen';

const inter = Inter({ subsets: ['latin'] });

export default function ChatPage() {
  const [showSidebar, setShowSidebar] = useState(false);

  return (
    <div className={`${inter.className}text-gray-800 dark:text-gray-50 lg:flex h-screen`}>
      <header className="fixed top-0 flex items-center justify-between w-full p-5 bg-white shadow-sm lg:hidden dark:bg-gray-900 dark:shadow-md">
        <IconButton onClick={() => setShowSidebar(true)}>
          <Bars3Icon className="w-5" />
        </IconButton>
        <p className="font-medium">New Chat</p>
        <IconButton>
          <PlusIcon className="w-5" />
        </IconButton>
      </header>
      <aside
        className={`${
          showSidebar ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        } fixed lg:relative gap-3 left-0 top-0 lg:z-10 z-30 h-screen overflow-auto bg-white duration-300 w-3/4 lg:w-1/4 p-6 flex flex-col justify-between dark:bg-gray-900 dark:text-gray-50 shadow-lg`}
      >
        <div>
          <div className="flex items-center gap-2 mb-6">
            <Image
              src="https://avatars.githubusercontent.com/u/60980963?v=4/"
              width={30}
              height={30}
              style={{ objectFit: 'cover' }}
              alt="profile"
              className="rounded-full"
            />
            <p className="font-medium">Esto Triramdani</p>
          </div>
          <button className="flex items-center justify-center w-full gap-2 py-2 border rounded outline-none">
            <PlusIcon className="w-4" /> New Chat
          </button>
        </div>
        <div className="flex flex-col flex-1 w-full gap-2 overflow-auto">
          {Array(15)
            .fill(0)
            .map((_, i) => (
              <div
                key={i}
                className="flex items-center justify-between w-full gap-2 px-2 py-2 border rounded outline-none"
              >
                <button className="block w-full text-left">Chat #{i}</button>
                <div className="flex gap-1">
                  <IconButton>
                    <PencilIcon className="w-4" />
                  </IconButton>
                  <IconButton>
                    <TrashIcon className="w-4" />
                  </IconButton>
                </div>
              </div>
            ))}
        </div>
        <div>
          <ul className="flex flex-col gap-2">
            <ListButton icon={TrashIcon} title="Clear Current Conversation" />
            <ListButton icon={MoonIcon} title="Dark Mode" />
            <ListButton icon={UserIcon} title="Upgrade to Plus" />
            <ListButton icon={ArrowLeftIcon} title="Logout" />
          </ul>
        </div>
      </aside>
      {showSidebar && (
        <button
          onClick={() => setShowSidebar((prev) => !prev)}
          className="fixed inset-0 z-20 block cursor-default bg-gray-300/50 dark:bg-gray-800/90"
        ></button>
      )}

      <div className="flex-1 lg:h-screen bg-gray-50 dark:bg-gray-800">
        <div className="flex items-center justify-center h-screen">
          <IniChatScreen/>
        </div>
        
        <div className="fixed bottom-0 right-0 z-10 w-full bg-white lg:w-3/4 dark:bg-gray-900">
          <form className="flex items-center px-4 overflow-hidden h-14">
            <input
              type="text"
              className="flex-1 w-full p-2 bg-transparent outline-none placeholder:text-gray-300 disabled:text-gray-600 disabled:cursor-not-allowed"
              placeholder={false ? 'Please wait...' : 'Type your message here'}
            />
            <button
              type="submit"
              className={`p-2 transition-all duration-200 rounded-lg outline-none focus:ring ring-gray-500 disabled:text-gray-600 disabled:cursor-not-allowed ${
                false ? 'translate-x-14' : 'translate-x-1'
              }`}
            >
              <PaperAirplaneIcon
                className={`duration-150 ${false ? 'text-gray-600' : ''} ${
                  false ? 'w-8 h-8 text-gray-500 animate-pulse' : 'text-gray-600 w-6 h-6'
                }`}
              />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
