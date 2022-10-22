import { unstable_getServerSession } from '@auth/next-auth/src';
import { NextApiRequest, NextApiResponse } from 'next';
import { Session } from 'next-auth';
import { pushArticleToFirebase } from '@lib/api/pushArticleToFirebase';
import {
  getArticleFromFirebase,
  getBulkArticleFromFirebase,
} from '@lib/api/getArticleFromFirebase';
import '@extType/ExtendedServerSession';
import '@extType/ExtendedAdapterUser';
import { GetArticleBodyType } from '../../../src/type/api/getArticle';

export default async function getArticle(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).json({ message: 'wrong methods' });
  // @ts-ignore
  //const session: ServerSession | null = await unstable_getServerSession(req, res, authOptions);
  /*
  if (!session) {
    return res.status(401).json({ message: 'You must be logged in.' });
  }
  */
  const { data }: GetArticleBodyType = JSON.parse(req.body);
  if (data.id) {
    try {
      const article = await getArticleFromFirebase(data.id);
      return res.status(200).json({ message: 'success', data: article });
    } catch (e) {
      return res.status(401).json({ message: 'API-DB transaction failed', error: e });
    }
  } else if (data.bulk) {
    try {
      const articles = await getBulkArticleFromFirebase(data.bulk);
      return res.status(200).json({ message: 'success', data: articles });
    } catch (e) {
      return res.status(401).json({ message: 'API-DB transaction failed.', error: e });
    }
  }
  return res.status(400).json({ message: 'wrong body' });
}
