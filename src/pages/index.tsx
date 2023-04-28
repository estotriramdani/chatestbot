import React from 'react';
import { useSession, signIn, signOut } from 'next-auth/react';
import useUser from '@/hooks/useUser';

export default function Home() {
  const session = useSession();

  const user = useUser()

  console.log(user);

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
