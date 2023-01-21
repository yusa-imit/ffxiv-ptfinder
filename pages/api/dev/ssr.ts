import { unstable_getServerSession } from '@auth/next-auth/src';
import { unstable_getServerSession as unstable_origin, Session } from 'next-auth';
import { NextApiRequest, NextApiResponse } from 'next';
import '@extType/ExtendedServerSession';
import { pushAnnounceToFirebase } from '@lib/api/pushAnnounceToFirebase';
import { authOptions } from '../auth/[...nextauth]';

export default async function query(req: NextApiRequest, res: NextApiResponse) {
  // @ts-ignore
  const session_modified = await unstable_getServerSession(req, res, authOptions);
  // @ts-ignore
  const session_origin = await unstable_getServerSession(req, res, authOptions);
  try {
    return res.status(200).json({ message: 'success', data: { session_modified, session_origin } });
  } catch (e) {
    return res.status(401).json({ message: 'API-DB transaction failed.', error: e });
  }
}
