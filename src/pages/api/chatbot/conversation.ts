import type { NextApiRequest, NextApiResponse } from 'next';

export const config = {
  api: {
    bodyParser: {
      sizeLimit: '5000kb',
    },
  },
};
const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  res.json({
    status: 'success',
    message: '',
    data: [],
  });
};
export default handler;
