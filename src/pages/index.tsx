import React from 'react';
import { useSession, signIn, signOut } from 'next-auth/react';
import useUser from '@/hooks/useUser';
import useSWR from 'swr';
import { fetcher } from '@/services/fetcher';

export default function Home() {
  const session = useSession();

  const user = useUser();

  const d = useSWR('http://localhost:3000/api/restricted', fetcher);
  console.log(d);
  
  if (!session.data) {
    return (
      <div>
        Not signed in <br />
        <button
          onClick={() => signIn()}
          className="px-4 py-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-700"
        >
          Sign in
        </button>
      </div>
    );
  }

  return (
    <div>
      <pre>{JSON.stringify(session, null, 2)}</pre>
      <button
        onClick={() => signOut()}
        className="px-4 py-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-700"
      >
        Sign Out
      </button>
    </div>
  );
}
