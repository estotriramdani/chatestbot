import React, { useState } from 'react';
import {
  Bars3Icon,
  PlusIcon,
  SunIcon,
  ChevronRightIcon,
  PaperAirplaneIcon,
  TrashIcon,
  MoonIcon,
  UserIcon,
  ArrowLeftIcon,
} from '@heroicons/react/24/outline';
import { Inter } from 'next/font/google';
import IconButton from '@/components/IconButton';
import Image from 'next/image';
import ListButton from '@/components/ListButton';

const inter = Inter({ subsets: ['latin'] });

const EXAMPLE_QUESTIONS = [
  `Got any creative ideas for a 10 year old's birthday?`,
  `Explain quantum computing in simple terms`,
  `How do I make an HTTP request in Javascript?"`,
];

export default function ChatPage() {
  const [showSidebar, setShowSidebar] = useState(true);

  return (
    <div className={`${inter.className}text-gray-800 dark:text-gray-50`}>
      <header className="fixed top-0 flex items-center justify-between w-full p-5 bg-white shadow-sm dark:bg-gray-900 dark:shadow-md">
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
          showSidebar ? 'translate-x-0' : '-translate-x-full'
        } fixed left-0 top-0 z-30 h-screen bg-white duration-300 w-3/4 p-6 flex flex-col justify-between dark:bg-gray-900 dark:text-gray-50 shadow-lg`}
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
          <div>
            <button className="flex items-center justify-center w-full gap-2 py-2 border rounded outline-none">
              <PlusIcon className="w-4" /> New Chat
            </button>
          </div>
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

      <div className="bg-gray-50 dark:bg-gray-800">
        <div className="flex items-center justify-center min-h-screen ">
          <div className="flex flex-col items-center justify-center w-3/5 p-4 bg-white rounded shadow-sm dark:bg-gray-900 dark:shadow-md">
            <SunIcon className="w-7" />
            <p className="mt-2 font-medium">Examples</p>
            <div className="flex flex-col gap-2 mt-3">
              {EXAMPLE_QUESTIONS.map((question) => (
                <button
                  key={question}
                  className="block p-2 px-3 font-serif italic text-left bg-gray-100 rounded outline-none dark:bg-gray-800 focus:bg-gray-600 focus:text-gray-50 active:ring-1 ring-offset-1 ring-gray-600 dark:ring-gray-500"
                >
                  {question}
                  <ChevronRightIcon className="inline-block w-4" />
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="fixed bottom-0 z-10 w-full bg-white rounded-t dark:bg-gray-900">
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
  );
}
