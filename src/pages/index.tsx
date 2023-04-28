import React from 'react';
import { useSession, signIn, signOut } from 'next-auth/react';

export default function Home() {
  const session = useSession();

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
