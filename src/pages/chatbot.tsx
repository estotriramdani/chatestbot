import React from 'react';
import {
  PaperAirplaneIcon,
  ChatBubbleBottomCenterIcon,
  ChatBubbleOvalLeftEllipsisIcon,
  PlusCircleIcon,
} from '@heroicons/react/24/solid';

export default function ChatBotPage() {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    alert('Form submitted!');
  };

  return (
    <main className="relative flex min-h-screen bg-gradient-to-br from-slate-100 to-slate-50">
      <aside className="relative flex-shrink-0 w-96">
        <div className="sticky top-0 flex flex-col h-screen p-5 overflow-auto">
          <div className="flex items-center gap-1">
            <ChatBubbleOvalLeftEllipsisIcon className="h-7 w-7 text-violet-500" />
            <h1 className="text-2xl font-bold text-violet-500">ChatestBot</h1>
          </div>
          <div className="w-1/4 h-1 mt-2 from-violet-600 to-violet-500 bg-gradient-to-r" />
          <div className="flex flex-col justify-between flex-1 mt-3">
            <div>
              <p>You have no session created.</p>
            </div>
            <button className="flex items-center justify-center w-full gap-1 p-3 text-center text-white rounded-lg shadow-lg from-violet-600 to-violet-500 bg-gradient-to-r">
              <PlusCircleIcon className="w-5 h-5" />
              <span>Create New Session</span>
            </button>
          </div>
        </div>
      </aside>
      <div className="flex flex-col justify-between w-full">
        <div className="flex flex-col-reverse flex-1 h-screen gap-3 p-5 pb-10 overflow-auto">
          {Array(100)
            .fill(0)
            .map((_, i) => (
              <div
                key={i}
                className="px-5 py-3 overflow-auto text-right text-gray-800 shadow-sm shadow-violet-100 bg-gradient-to-br from-slate-100 to-slate-50 rounded-xl"
              >
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
              </div>
            ))}
        </div>
        <div className="sticky px-5 bottom-5">
          <form
            onSubmit={handleSubmit}
            className="flex items-center p-0.5 px-4 overflow-hidden bg-gradient-to-b from-slate-50 to-white rounded-xl shadow-sm"
          >
            <ChatBubbleBottomCenterIcon className="w-6 h-6 text-violet-500" />
            <input
              type="text"
              className="flex-1 w-full p-3 bg-transparent outline-none placeholder:text-violet-300"
              placeholder="Ask whatever you want..."
            />
            <button
              type="submit"
              className="p-3 rounded-lg outline-none focus:ring ring-violet-500"
            >
              <PaperAirplaneIcon className="w-6 h-6 text-violet-500" />
            </button>
          </form>
        </div>
      </div>
    </main>
  );
}
