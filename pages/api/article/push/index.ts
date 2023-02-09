import { unstable_getServerSession, Session } from 'next-auth';
import { NextApiRequest, NextApiResponse } from 'next';
import { pushArticleToFirebase } from '@lib/api/deprecated/pushArticleToFirebase';
import '@extType/ExtendedServerSession';
import { authOptions } from '../../auth/[...nextauth]';
import '@extType/ExtendedAdapterUser';
import { PushArticleBodyType, PushArticleReturnType } from '../../../../src/type/api/article/push';

export default async function pushArticle(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST')
    return res.setHeader('Allow', ['POST']).status(403).json({ message: 'wrong methods' });
  // @ts-ignore
  const session: ServerSession | null = await unstable_getServerSession(req, res, authOptions);
  if (!session) {
    return res.status(401).json({ message: 'You must be logged in.' });
  }
  const { data }: PushArticleBodyType = JSON.parse(req.body);
  try {
    const code = await pushArticleToFirebase(data, session.user.id);
    const returner: PushArticleReturnType = { message: 'success', destination: code };
    return res.status(200).json(returner);
  } catch (e) {
    return res.status(401).json({ message: 'API-DB transaction failed.', error: e });
  }
}
