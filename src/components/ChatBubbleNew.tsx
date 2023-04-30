import { IChat } from '@/pages/chatbot';
import React, { useEffect, useState } from 'react';

export default function ChatBubble({
  item,
  isAnimated,
}: {
  item: IChat;
  isAnimated: boolean;
}) {
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

  return (
    <div
      key={item.id}
      className={`flex justify-end gap-2 ${item.sender === 'assistant' ? 'flex-row-reverse' : ''}`}
    >
      <p
        dangerouslySetInnerHTML={{
          __html: isAnimated ? array.join(' ') : splittedMessage.join(' '),
        }}
        className={chatBoxClassNames}
      />
      {item.sender === 'assistant' ? (
        <div className="flex items-center justify-center w-10 h-10 font-medium rounded-full shadow select-none shadow-violet-500/30 text-violet-700 bg-gradient-to-br from-slate-50 via-slate-100 to-slate-50">
          E
        </div>
      ) : (
        <div className="flex items-center justify-center w-10 h-10 font-medium text-white rounded-full shadow select-none gradient-violet shadow-violet-500/20">
          E
        </div>
      )}
    </div>
  );
}
