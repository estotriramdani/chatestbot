import { IChat } from '@/pages/chatbot';
import React, { useEffect, useState } from 'react';

export default function ChatBubble({ item, isAnimated }: { item: IChat; isAnimated: boolean }) {
  const [array, setArray] = useState<string[]>([]);
  const splittedMessage = item.message.replace(/\n/g, '<br />').split(' ');
  const [currentIndex, setCurrentIndex] = useState(0);
  const chatBoxClassNames = `inline-block px-5 py-3 overflow-auto shadow-sm shadow-violet-100 ${
    item.sender === 'assistant'
      ? 'text-left text-violet-700 bg-gradient-to-br from-slate-50 via-slate-150 to-slate-50 shadow shadow-violet-500/30'
      : 'text-right text-white bg-gradient-to-br from-violet-500 via-violet-500 to-violet-600 shadow shadow-violet-500/20'
  } rounded-xl`;

  useEffect(() => {
    if (isAnimated) {
      const interval = setInterval(() => {
        // You'd want an exit condition here
        if (currentIndex < splittedMessage.length) {
          setArray((arr) => {
            return [...arr, splittedMessage[currentIndex]];
          });
          setCurrentIndex((prev) => prev + 1);
        }
      }, 200);

      return () => clearInterval(interval);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentIndex]);

  if (item.sender === 'user')
    return (
      <div className="flex flex-col items-end justify-end">
        <p
          className="p-3 bg-gray-200 rounded dark:bg-slate-500 dark:shadow-sm"
          dangerouslySetInnerHTML={{
            __html: isAnimated ? array.join(' ') : splittedMessage.join(' '),
          }}
        ></p>
      </div>
    );

  return (
    <div className="flex flex-col items-start justify-start">
      <p
        className="p-3 bg-white rounded shadow-sm dark:shadow-sm dark:bg-slate-700"
        dangerouslySetInnerHTML={{
          __html: isAnimated ? array.join(' ') : splittedMessage.join(' '),
        }}
      ></p>
      <p className="text-xs capitalize text-gry-500">{item.sender}</p>
    </div>
  );
}
