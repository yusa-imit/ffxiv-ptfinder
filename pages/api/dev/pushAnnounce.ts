import { unstable_getServerSession } from '@auth/next-auth/src';
import { NextApiRequest, NextApiResponse } from 'next';
import { Session } from 'next-auth';
import '@extType/ExtendedServerSession';

export default async function pushArticle(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(403).json({ message: 'wrong methods' });
  // @ts-ignore
  const session: Session | null = await unstable_getServerSession(req, res, authOptions);
  if (!session) {
    return res.status(401).json({ message: 'You must be logged in.' });
  }
  if (session.user.role !== 'admin') {
    return res.status(401).json({ message: 'dev features can only be accessed by admins' });
  }
  const { data } = JSON.parse(req.body);
  try {
    const code = pushArticleToFirebase(data, session.user.id);
    return res.status(200).json({ message: 'success', destination: code });
  } catch (e) {
    return res.status(401).json({ message: 'API-DB transaction failed.', error: e });
  }
}
