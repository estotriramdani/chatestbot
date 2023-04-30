import React from 'react';
import { useSession, signIn, signOut } from 'next-auth/react';
import { GetServerSideProps } from 'next';
import { getToken } from 'next-auth/jwt';

export default function Home(props: any) {
  const session = useSession();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen gradient-bg-violet">
      <div className="p-4 gradient-violet rounded-xl">
        <h1 className="py-2 text-5xl font-bold text-center text-white">
          Start chatting with AI. <br /> Today.
        </h1>
      </div>
      <div className="mt-3">
        <button
          onClick={() => signIn()}
          className="flex items-center justify-center w-full gap-1 p-2 px-4 text-center text-white shadow-lg outline-none rounded-xl gradient-violet focus:ring-2 ring-offset-2 ring-violet-500 ring-offset-violet-100"
        >
          Sign in
        </button>
      </div>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const token = await getToken({ req: context.req });

  return {
    props: {
      token: token,
    },
  };
};
