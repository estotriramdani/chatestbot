import React, { useContext } from 'react';
import {
  PlusIcon,
  TrashIcon,
  MoonIcon,
  UserIcon,
  ArrowLeftIcon,
  PencilIcon,
  SunIcon,
} from '@heroicons/react/24/outline';
import IconButton from '@/components/IconButton';
import Image from 'next/image';
import ListButton from '@/components/ListButton';
import GlobalContext from '@/context/GlobalContext';
import { THEME_KEY } from '@/constants';

export default function Sidebar() {
  const { showSidebar, setShowSidebar, setTheme, theme } = useContext(GlobalContext);

  const handleToggleTheme = () => {
    if (theme === 'light') {
      setTheme('dark');
      document.documentElement.classList.add('dark');
      localStorage.setItem(THEME_KEY, 'dark');
    } else {
      setTheme('light');
      document.documentElement.classList.remove('dark');
      localStorage.setItem(THEME_KEY, 'light');
    }
  };

  return (
    <>
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
            <ListButton
              icon={theme === 'light' ? MoonIcon : SunIcon}
              title={theme === 'light' ? 'Dark Mode' : 'Light Mode'}
              onClick={handleToggleTheme}
            />
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
    </>
  );
}
