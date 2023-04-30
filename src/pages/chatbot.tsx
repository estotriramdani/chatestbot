import React, { useRef, useState } from 'react';
import { v4 } from 'uuid';
import {
  PaperAirplaneIcon,
  ChatBubbleBottomCenterIcon,
  ChatBubbleOvalLeftEllipsisIcon,
  PlusCircleIcon,
  TrashIcon,
  CalendarDaysIcon,
} from '@heroicons/react/24/solid';
import ChatBubble from '@/components/ChatBubble';
import moment from 'moment';
import { GetServerSideProps } from 'next';
import { getToken } from 'next-auth/jwt';

export interface IChat {
  id: string;
  message: string;
  sender: 'user' | 'assistant';
  senderName: string;
}

export interface IChatSession {
  id: string;
  title: string;
  chats: IChat[];
  createdAt: string;
}

export const DUMMY_CHATS = (): IChat[] => [
  {
    id: v4(),
    message: 'Hi! Bot!',
    sender: 'user',
    senderName: 'Esto',
  },
  {
    id: v4(),
    message: 'Hi! How can I assist you today?',
    sender: 'assistant',
    senderName: 'Bot',
  },
  {
    id: v4(),
    message: 'Nothing. \nGo sleep!',
    sender: 'user',
    senderName: 'Esto',
  },
  {
    id: v4(),
    message: 'OK, then. Bye! 😀',
    sender: 'assistant',
    senderName: 'Bot',
  },
];

const DUMMY_CHAT_SESSIONS = (): IChatSession => ({
  id: v4(),
  title: 'First chat',
  chats: DUMMY_CHATS(),
  createdAt: new Date().toISOString(),
});

const countBotAnswers = (chats: IChat[]) => {
  return chats.filter((item) => item.sender === 'assistant').length;
};

export const sleep = (ms: number) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

export default function ChatBotPage() {
  const [chats, setChats] = useState<IChat[]>([]);
  const [chatSessions, setChatSessions] = useState<IChatSession[]>([]);
  const [selectedChatSessionId, setSelectedChatSessionId] = useState('');

  const [typing, setTyping] = useState('');
  const [loadingAnswer, setLoadingAnswer] = useState(false);
  const [animatedMessage, setAnimatedMessage] = useState('');
  const [isPaperFly, setIsPaperFly] = useState(false);

  const scrollToBottom = () => {
    window.scrollTo({
      top: document.body.scrollHeight + document.getElementById('inputBox')!.clientHeight,
      behavior: 'smooth',
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const senderMessage: IChat = {
      id: v4(),
      message: typing,
      sender: 'user',
      senderName: 'Esto',
    };

    const answerId = v4();

    const responseMessage: IChat = {
      id: answerId,
      message: 'This message is gonna be animated.\nSo please wait',
      sender: 'assistant',
      senderName: 'Esto',
    };

    setChats((prev) => {
      return [...prev, senderMessage];
    });

    setTyping('');
    setLoadingAnswer(true);

    await sleep(3000);

    setAnimatedMessage(answerId);
    setLoadingAnswer(false);
    setIsPaperFly(true);

    scrollToBottom();

    setChats((prev) => {
      return [...prev, responseMessage];
    });

    await sleep(2000);
    setIsPaperFly(false);
  };

  const handleAddSession = (id: string) => {
    setChatSessions((prev) => [...prev, DUMMY_CHAT_SESSIONS()]);
  };

  const handleSelectSession = (session: IChatSession) => {
    setSelectedChatSessionId(session.id);
    setChats(session.chats);
  };

  const handleDeleteSession = (id: string) => {
    if (selectedChatSessionId === id) {
      setChats([]);
      setSelectedChatSessionId('');
    }
    setChatSessions((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <main className="relative flex min-h-screen gradient-bg-violet">
      <aside className="relative flex-shrink-0 w-96">
        <div className="sticky top-0 flex flex-col h-screen gap-2 p-5 overflow-auto">
          <div className="flex items-center gap-1">
            <ChatBubbleOvalLeftEllipsisIcon className="h-7 w-7 text-violet-500" />
            <h1 className="text-2xl font-bold text-violet-500">ChatestBot</h1>
          </div>
          <div className="w-1/4 h-1 gradient-violet" />
          <div className="flex flex-col justify-between gap-2 mt-2">
            <div>
              {chatSessions.length === 0 && <p>You have no session created.</p>}
              {chatSessions.map((item, index) => (
                <div
                  key={item.id}
                  className={`mb-2 flex items-center justify-between w-full p-3 text-left border rounded-xl border-violet-500 ring-offset-2 ring-violet-500 ring-offset-violet-100 outline-none ${
                    item.id === selectedChatSessionId
                      ? 'text-white gradient-violet'
                      : 'text-violet-500'
                  }`}
                >
                  <button
                    onClick={() => handleSelectSession(item)}
                    className="w-full text-left outline-none"
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <CalendarDaysIcon className="w-5 h-5" />
                        <span className="text-lg font-bold">Session #{index + 1} </span>
                      </div>
                      <span className="">{moment(item.createdAt).format('LLLL')}</span>
                    </div>
                  </button>
                  <button onClick={() => handleDeleteSession(item.id)}>
                    <TrashIcon className="w-5 h-5 text-red-400" />
                  </button>
                </div>
              ))}
            </div>
            <div>
              <button
                className="flex items-center justify-center w-full gap-1 p-3 text-center text-white shadow-lg outline-none rounded-xl h-14 gradient-violet focus:ring-2 ring-offset-2 ring-violet-500 ring-offset-violet-100"
                onClick={() => handleAddSession(v4())}
              >
                <PlusCircleIcon className="w-5 h-5" />
                <span>Create New Session</span>
              </button>
            </div>
          </div>
        </div>
      </aside>
      <div className="flex flex-col justify-end w-full">
        <div className="flex flex-col flex-1 h-screen gap-3 p-5 pb-12 overflow-auto">
          {chats.map((item) => (
            <ChatBubble item={item} key={item.id} isAnimated={false} />
          ))}
          {loadingAnswer && (
            <div className="flex items-center gap-1">
              <div className="flex-shrink-0 w-2 h-2 rounded-full bg-violet-600 animate-bounce delay-0"></div>
              <div className="flex-shrink-0 w-2 h-2 delay-100 rounded-full bg-violet-600 animate-bounce"></div>
              <div className="flex-shrink-0 w-2 h-2 delay-200 rounded-full bg-violet-600 animate-bounce"></div>
            </div>
          )}
          {chats.length === 0 && (
            <div className="inline-block p-3 text-center text-white bg-violet-400 rounded-xl">
              <p>Please select or create new chat session</p>
            </div>
          )}
        </div>
        <div
          className={`sticky px-5 bottom-5 ${selectedChatSessionId === '' ? 'hidden' : ''}`}
          id="inputBox"
        >
          <form
            onSubmit={handleSubmit}
            className="flex items-center px-4 overflow-hidden shadow-sm h-14 bg-gradient-to-b from-slate-50 to-white rounded-xl"
          >
            <ChatBubbleBottomCenterIcon className="w-6 h-6 text-violet-500" />
            <input
              type="text"
              className="flex-1 w-full p-2 bg-transparent outline-none placeholder:text-violet-300 disabled:text-violet-600 disabled:cursor-not-allowed"
              placeholder={loadingAnswer ? 'Please wait...' : 'Type your message here'}
              value={typing}
              onChange={(e) => setTyping(e.target.value)}
              disabled={loadingAnswer}
            />
            <button
              type="submit"
              className={`p-2 transition-all duration-200 rounded-lg outline-none focus:ring ring-violet-500 disabled:text-slate-600 disabled:cursor-not-allowed ${
                isPaperFly ? 'translate-x-14' : 'translate-x-1'
              }`}
              disabled={loadingAnswer || typing.length === 0}
            >
              <PaperAirplaneIcon
                className={`duration-150 ${typing.length === 0 ? 'text-slate-600' : ''} ${
                  loadingAnswer ? 'w-8 h-8 text-slate-600 animate-pulse' : 'text-violet-500 w-6 h-6'
                }`}
              />
            </button>
          </form>
        </div>
      </div>
    </main>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const token = await getToken({ req: context.req });

  // if (!token) {
  //   return {
  //     redirect: {
  //       destination: '/',
  //       permanent: false,
  //     },
  //   };
  // }

  return {
    props: {},
  };
};
