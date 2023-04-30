import React, { useContext, useState } from 'react';
import {
  PlusIcon,
  TrashIcon,
  MoonIcon,
  UserIcon,
  ArrowLeftIcon,
  PencilIcon,
  SunIcon,
  EllipsisHorizontalCircleIcon,
  CheckIcon,
} from '@heroicons/react/24/outline';
import IconButton from '@/components/IconButton';
import Image from 'next/image';
import ListButton from '@/components/ListButton';
import GlobalContext from '@/context/GlobalContext';
import { THEME_KEY } from '@/constants';
import axios from 'axios';
import { RAPI } from '@/interfaces';
import { toast } from 'react-hot-toast';
import { XMarkIcon } from '@heroicons/react/24/solid';
import ConversationCard from '../ConversationCard';

export default function Sidebar() {
  const {
    showSidebar,
    setShowSidebar,
    setTheme,
    theme,
    limitChats,
    conversations,
    mutateConversations,
  } = useContext(GlobalContext);
  const [titleConversation, setTitleConversation] = useState('');
  const [toggleInputTitle, setToggleInputTitle] = useState(false);

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

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      const response: RAPI = await axios
        .post(`${process.env.NEXT_PUBLIC_URL}/api/conversations/new`, {
          title: titleConversation,
        })
        .then((res) => res.data);
      if (response.status === 'success') {
        toast.success('Conversation created successfully');
        setTitleConversation('');
        mutateConversations?.();
        setToggleInputTitle(false);
      }
    } catch (error: any) {
      toast.error(error.response.data.message);
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
          {toggleInputTitle ? (
            <form onSubmit={handleSubmit} className="flex gap-2">
              <button
                type="button"
                className="flex items-center justify-center w-10 border rounded"
                onClick={() => setToggleInputTitle((prev) => !prev)}
              >
                <XMarkIcon className="w-5" />
              </button>
              <input
                className="w-full p-2 py-1 border rounded outline-none"
                type="text"
                placeholder="Title Conversation"
                value={titleConversation}
                onChange={(e) => setTitleConversation(e.target.value)}
              />
              <button
                type="submit"
                className="flex items-center justify-center w-10 border rounded"
              >
                <CheckIcon className="w-5" />
              </button>
            </form>
          ) : (
            <button
              onClick={() => setToggleInputTitle((prev) => !prev)}
              className="flex items-center justify-center w-full gap-2 py-2 border rounded outline-none"
            >
              <PlusIcon className="w-4" /> New Chat
            </button>
          )}
        </div>
        <div className="flex flex-col flex-1 w-full gap-2 overflow-auto">
          {conversations?.data?.map((conversation) => (
            <ConversationCard conversation={conversation} key={conversation._id} />
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
            <ListButton
              disabled
              icon={EllipsisHorizontalCircleIcon}
              title={`Your daily limit: ${limitChats?.data.sentChats} of ${limitChats?.data.limit}`}
            />
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
