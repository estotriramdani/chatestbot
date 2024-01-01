import { COLLECTION_NAME } from '@/constants';
import { connectMongoDB } from '@/database/connect';
import { IChat, RAPIChat } from '@/interfaces';
import moment from 'moment';
import type { NextApiRequest, NextApiResponse } from 'next';
import { getToken } from 'next-auth/jwt';
import { Configuration, OpenAIApi } from 'openai';
import { v4 } from 'uuid';

export const config = {
  api: {
    bodyParser: {
      sizeLimit: '5000kb',
    },
  },
};

const handler = async (req: NextApiRequest, res: NextApiResponse<RAPIChat>) => {
  try {
    const token = await getToken({ req });

    if (!token) return res.status(401).json({ status: 'error', message: 'Unauthorized' });

    if (req.method?.toUpperCase() !== 'POST')
      return res.status(405).json({ status: 'error', message: 'Method not allowed' });

    const md = await connectMongoDB();

    const conversationId = req.query.conversationId as string;
    const { message } = req.body;

    const openAI = new OpenAIApi(
      new Configuration({
        apiKey: process.env.OPENAI_KEY,
      })
    );

    const getAllConversation = await md.db
      .collection(COLLECTION_NAME.Chat)
      .find({
        conversationId: conversationId,
      })
      .toArray();

    let prompt = 'Human: Hello, who are you? \n AI: I am doing great. How can I help you today? \n';

    getAllConversation.forEach((item) => {
      prompt += ` ${item.sender === 'user' ? 'Human' : 'AI'}: ${item.message} \n`;
    });

    const getLimitChat = await md.db.collection(COLLECTION_NAME.DailyLimit).findOne({
      date: moment().format('YYYY-MM-DD'),
      email: token?.email,
    });

    const getDailyLimit = await md.db.collection(COLLECTION_NAME.UserChatDailyLimit).findOne({
      email: token?.email,
    });

    if (!getLimitChat) {
      await md.db.collection(COLLECTION_NAME.DailyLimit).insertOne({
        date: moment().format('YYYY-MM-DD'),
        email: token?.email,
        sentChats: 1,
      });
    } else {
      if (getLimitChat.sentChats > getDailyLimit?.limit) {
        return res.status(500).json({ status: 'error', message: 'Daily limit exceeded' });
      }
      await md.db.collection(COLLECTION_NAME.DailyLimit).updateOne(
        {
          date: moment().format('YYYY-MM-DD'),
          email: token?.email,
        },
        {
          $inc: { sentChats: 1 },
        }
      );
    }

    const resOpenAI = await openAI.createCompletion({
      model: 'text-davinci-003',
      prompt: `${prompt} \n Human: ${message} \n AI:`,
      temperature: 0.9,
      max_tokens: 150,
      top_p: 1,
      frequency_penalty: 0.0,
      presence_penalty: 0.6,
      stop: [' Human:', ' AI:'],
    });

    if (!resOpenAI?.data?.choices?.[0].text) {
      return res.status(500).json({ status: 'error', message: 'Something went wrong' });
    }

    const responseAI: IChat = {
      message: resOpenAI.data.choices[0].text || 'Sorry, I do not understand',
      sender: 'assistant',
    };

    const questionHuman: IChat = {
      message: 'Hello!\nWelcome to Dota 2. \nThanks. \nRegards, \nDota 2 Team',
      sender: 'user',
    };

    await md.db.collection(COLLECTION_NAME.Chat).insertMany([
      {
        conversationId: conversationId,
        message,
        sender: 'user',
        createdAt: new Date(),
      },
      {
        conversationId: conversationId,
        message: resOpenAI.data.choices[0].text,
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
  } catch (error) {
    console.log(error);
    return res.status(500).json({ status: 'error', message: 'Something went wrong' });
  }
};

export default handler;
