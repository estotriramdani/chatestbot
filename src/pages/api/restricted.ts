import type { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth';
import * as all from './auth/[...nextauth]';

export const config = {
  api: {
    bodyParser: {
      sizeLimit: '5000kb',
    },
  },
};

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const alias = all as any;
  const session = await getServerSession(req, res, alias.authOptions);

  console.log(session);

  res.json({
    status: 'success',
    message: '',
    data: [],
  });
};

export default handler;
