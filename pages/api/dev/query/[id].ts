import { unstable_getServerSession } from '@auth/next-auth/src';
import { NextApiRequest, NextApiResponse } from 'next';
import { Session } from 'next-auth';
import '@extType/ExtendedServerSession';
import { pushAnnounceToFirebase } from '@lib/api/pushAnnounceToFirebase';

export default async function query(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;
  try {
    return res.status(200).json({ message: 'success', id, query: JSON.stringify(req.query) });
  } catch (e) {
    return res.status(401).json({ message: 'API-DB transaction failed.', error: e });
  }
}
