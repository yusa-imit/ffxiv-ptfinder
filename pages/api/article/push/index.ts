import '@extType/ExtendedAdapterUser';
import '@extType/ExtendedServerSession';
import { pushArticle } from '@lib/api/pushArticle';
import { NextApiRequest, NextApiResponse } from 'next';
import { unstable_getServerSession } from 'next-auth';
import { PushArticleBodyType, PushArticleReturnType } from '../../../../src/type/api/article/push';
import { authOptions } from '../../auth/[...nextauth]';

export default async function apiPushArticle(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST')
    return res.setHeader('Allow', ['POST']).status(403).json({ message: 'wrong methods' });
  // @ts-ignore
  const session: ServerSession | null = await unstable_getServerSession(req, res, authOptions);
  if (!session) {
    return res.status(401).json({ message: 'You must be logged in.' });
  }
  const { data }: PushArticleBodyType = JSON.parse(req.body);
  try {
    const code = await pushArticle(data, session.user.id);
    const returner: PushArticleReturnType = { message: 'success', destination: code };
    return res.status(200).json(returner);
  } catch (e) {
    return res.status(401).json({ message: 'API-DB transaction failed.', error: e });
  }
}
