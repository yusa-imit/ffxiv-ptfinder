import { unstable_getServerSession } from '@auth/next-auth/src';
import { NextApiRequest, NextApiResponse } from 'next';
import { Session } from 'next-auth';
import { pushArticleToFirebase } from '@lib/api/pushArticleToFirebase';
import {
  getArticleFromFirebase,
  getBulkArticleSummaryFromFirebase,
} from '@lib/api/getArticleFromFirebase';
import '@extType/ExtendedServerSession';
import '@extType/ExtendedAdapterUser';
import { getUserFromFirebase } from '@lib/api/getUserFromFirebase';
import { GetArticleQueryType } from '../../../src/type/api/article/get';

/**
 * @example /api/user/ckuiodfkjer
 * @param req
 * @param res
 * @returns User Data
 */
export default async function getUserById(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') return res.status(405).json({ message: 'wrong methods' });
  const { id }: GetArticleQueryType = req.query;
  if (id) {
    try {
      const article = await getUserFromFirebase(id);
      res.setHeader('Cache-Control', 's-maxage=59, staile-while-revalidate');
      return res.status(200).json({ message: 'success', data: JSON.stringify(article) });
    } catch (e) {
      return res.status(401).json({ message: 'API-DB transaction failed', error: e });
    }
  }
  return res.status(400).json({ message: 'wrong request parameters' });
}
