import '@extType/ExtendedAdapterUser';
import '@extType/ExtendedServerSession';
import { pushAnnounce } from '@lib/api/pushAnnounce';
import { NextApiRequest, NextApiResponse } from 'next';
import { Session, unstable_getServerSession } from 'next-auth';
import { PushAnnounceBodyType, PushAnnounceReturnType } from '../../../src/type/api/annouce/push';
import { authOptions } from '../auth/[...nextauth]';

export default async function pushArticle(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST')
    return res.setHeader('Allow', ['POST']).status(405).json({ message: 'wrong methods' });
  const session: Session | null = await unstable_getServerSession(req, res, authOptions);
  if (!session) {
    return res.status(401).json({ message: 'You must be logged in.' });
  }
  if (session.user.role !== 'admin') {
    res.status(401).json({ message: 'You are not admin' });
  }
  const { data }: PushAnnounceBodyType = JSON.parse(req.body);
  try {
    const code = await pushAnnounce(data);
    const returner: PushAnnounceReturnType = { message: 'success', destination: code };
    return res.status(200).json(returner);
  } catch (e) {
    return res.status(401).json({ message: 'API-DB transaction failed.', error: e });
  }
}
