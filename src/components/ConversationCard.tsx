import { IConversation, RAPI } from '@/interfaces';
import React, { useContext } from 'react';
import { PencilIcon, TrashIcon } from '@heroicons/react/24/outline';
import IconButton from './IconButton';
import useFetch from '@/hooks/useFetch';
import { toast } from 'react-hot-toast';
import GlobalContext from '@/context/GlobalContext';

export default function ConversationCard({ conversation }: { conversation: IConversation }) {
  const { handleFetch, isLoading } = useFetch();
  const { mutateConversations } = useContext(GlobalContext);

  return (
    <div
      key={conversation._id}
      className="flex items-center justify-between w-full gap-2 px-2 py-2 border rounded outline-none"
    >
      <button className="block w-full text-left text-ellipsis">{conversation.title}</button>
      <div className="flex gap-1">
        <IconButton disabled={isLoading}>
          <PencilIcon className="w-4" />
        </IconButton>
        <IconButton
          disabled={isLoading}
          onClick={async () => {
            const response = await handleFetch<RAPI>({
              url: `/api/conversations/${conversation._id}`,
              method: 'DELETE',
            });
            if (response.status === 'success') {
              toast.success('Conversation deleted successfully');
              mutateConversations?.();
            }
          }}
        >
          <TrashIcon className="w-4" />
        </IconButton>
      </div>
    </div>
  );
}
