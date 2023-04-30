import React from 'react';

interface Props
  extends React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  icon: any;
  title: string;
}

export default function ListButton(props: Props) {
  return (
    <li>
      <button
        {...props}
        className="flex items-center w-full gap-1 p-2 px-3 text-left border rounded outline-none focus:bg-gray-600 focus:text-gray-50 active:ring-1 ring-offset-1 ring-gray-600"
      >
        <props.icon className="w-4" />
        <span className="text-sm">{props.title}</span>
      </button>
    </li>
  );
}
