import '@extType/ExtendedAdapterUser';
import '@extType/ExtendedServerSession';
import { getArticle } from '@lib/api/getArticle';
import { NextApiRequest, NextApiResponse } from 'next';
import { GetArticleQueryType } from '../../../../src/type/api/article/get';

/**
 * @example /api/article/get/full?id=kjdifdlskdf;
 * @param req
 * @param res
 * @returns
 */
export default async function getFullArticle(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET')
    return res.setHeader('Allow', ['GET']).status(405).json({ message: 'wrong methods' });
  const { id }: GetArticleQueryType = req.query;
  if (id) {
    try {
      const article = await getArticle(1, id);
      res.setHeader('Cache-Control', 's-maxage=59, staile-while-revalidate');
      return res.status(200).json({ message: 'success', data: article });
    } catch (e) {
      return res.status(401).json({ message: 'API-DB transaction failed', error: e });
    }
  }
  return res.status(400).json({ message: 'wrong request parameters' });
}
