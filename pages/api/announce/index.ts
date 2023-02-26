import '@extType/ExtendedAdapterUser';
import '@extType/ExtendedServerSession';
import { getAnnounceSummary, getBulkAnnounce } from '@lib/api/getAnnounce';
import { GetAnnounceQueryType } from '@type/api/annouce/get';
import { Locale } from '@type/Locale';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function getSummarizedAnnounce(req: NextApiRequest, res: NextApiResponse) {
  const locale: Locale = (req.query.locale as Locale | undefined) || 'en';
  if (req.method !== 'GET')
    return res.setHeader('Allow', ['GET']).status(405).json({ message: 'wrong methods' });
  const { page, number, s, id }: GetAnnounceQueryType = req.query;
  if (s) {
    if (!id) return res.status(401).json({ message: 'wrong request parameters' });
    try {
      const article = await getAnnounceSummary(locale, id);
      res.setHeader('Cache-Control', 's-maxage=59, staile-while-revalidate');
      return res.status(200).json({ message: 'success', data: article });
    } catch (e) {
      return res.status(401).json({ message: 'API-DB transaction failed', error: e });
    }
  } else {
    try {
      const articles = await getBulkAnnounce(
        locale,
        page ? Number(page) : undefined,
        number ? Number(number) : undefined
      );
      return res
        .setHeader('Cache-Control', 's-maxage=59, staile-while-revalidate')
        .status(200)
        .json({ message: 'success', data: articles });
    } catch (e) {
      return res.status(401).json({
        message: 'API-DB transaction failed or possibly request parameter is invalid.',
        error: e,
      });
    }
  }
}
