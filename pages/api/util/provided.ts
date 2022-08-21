import { unstable_getServerSession } from '@auth/next-auth/src';
import { getProvided } from '@auth/util/getProvided';
import { NextApiRequest, NextApiResponse } from 'next';
import { authOptions } from '../auth/[...nextauth]';
import '@extType/ExtendedServerSession';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') return res.status(400).json({ message: 'unknown request method' });
  // @ts-ignore
  const session: Session | null = await unstable_getServerSession(req, res, authOptions);
  if (!session) {
    return res.status(401).json({ message: 'You must be logged in.' });
  }
  const provided = await getProvided(session.user.id);
  return res.status(200).json({
    data: provided,
  });
}
