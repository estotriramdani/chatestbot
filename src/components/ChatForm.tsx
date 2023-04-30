import { PaperAirplaneIcon } from '@heroicons/react/24/outline';
import React from 'react';

export default function ChatForm() {
  return (
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
  );
}
