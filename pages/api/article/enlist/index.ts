import { unstable_getServerSession, Session } from 'next-auth';
import { NextApiRequest, NextApiResponse } from 'next';
import {
  getArticleSummaryFromFirebase,
  getArticleFromFirebase,
  getBulkArticleSummaryFromFirebase,
} from '@lib/api/deprecated/getArticleFromFirebase';
import '@extType/ExtendedServerSession';
import '@extType/ExtendedAdapterUser';
import { GetArticleQueryType } from '../../../../src/type/api/article/get';

/**
 * @example /api/article/get/summary?type=0&id=akldjfi;
 * @example /api/article/get/summary?type=0&number=15&page=0;
 * @param req
 * @param res
 * @returns
 */
export default async function getSummarizedArticle(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET')
    return res.setHeader('Allow', ['GET']).status(405).json({ message: 'wrong methods' });
  const { page, number, s, id }: GetArticleQueryType = req.query;
  if (s) {
    if (!id) return res.status(401).json({ message: 'wrong request parameters' });
    try {
      const article = await getArticleSummaryFromFirebase(0, id);
      res.setHeader('Cache-Control', 's-maxage=59, staile-while-revalidate');
      return res.status(200).json({ message: 'success', data: article });
    } catch (e) {
      return res.status(401).json({ message: 'API-DB transaction failed', error: e });
    }
  } else {
    try {
      const articles = await getBulkArticleSummaryFromFirebase(
        { articleType: 1 },
        page ? Number(page) : undefined,
        number ? Number(number) : undefined
      );
      res.setHeader('Cache-Control', 's-maxage=59, staile-while-revalidate');
      return res.status(200).json({ message: 'success', data: articles });
    } catch (e) {
      return res.status(401).json({
        message: 'API-DB transaction failed or possibly request parameter is invalid.',
        error: e,
      });
    }
  }
}
