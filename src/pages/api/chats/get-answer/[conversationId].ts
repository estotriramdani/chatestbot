import { COLLECTION_NAME } from '@/constants';
import { connectMongoDB } from '@/database/connect';
import { IChat, RAPIChat } from '@/interfaces';
import type { NextApiRequest, NextApiResponse } from 'next';
import { getToken } from 'next-auth/jwt';
import { v4 } from 'uuid';

export const config = {
  api: {
    bodyParser: {
      sizeLimit: '5000kb',
    },
  },
};

const handler = async (req: NextApiRequest, res: NextApiResponse<RAPIChat>) => {
  const token = await getToken({ req });

  if (!token) return res.status(401).json({ status: 'error', message: 'Unauthorized' });

  if (req.method !== 'POST')
    return res.status(405).json({ status: 'error', message: 'Method not allowed' });

  const conversationId = req.query.conversationId as string;
  const { message } = req.body;

  const responseAI: IChat = {
    message: 'Hello!\nWelcome to Dota 2. \nThanks. \nRegards, \nDota 2 Team',
    sender: 'assistant',
  };
  const questionHuman: IChat = {
    message: 'Hello!\nWelcome to Dota 2. \nThanks. \nRegards, \nDota 2 Team',
    sender: 'user',
  };

  const md = await connectMongoDB();

  await md.db.collection(COLLECTION_NAME.Chat).insertMany([
    {
      conversationId: conversationId,
      message,
      sender: 'user',
      createdAt: new Date(),
    },
    {
      conversationId: conversationId,
      message: 'Hello!\nWelcome to Dota 2. \nThanks. \nRegards, \nDota 2 Team',
      sender: 'assistant',
      createdAt: new Date(),
    },
  ]);

  await md.client.close();

  res.json({
    status: 'success',
    message: '',
    data: { _id: v4(), ...responseAI },
  });
};

export default handler;
