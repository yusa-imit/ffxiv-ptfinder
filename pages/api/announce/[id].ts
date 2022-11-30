import { unstable_getServerSession } from '@auth/next-auth/src';
import { NextApiRequest, NextApiResponse } from 'next';
import { Session } from 'next-auth';
import { pushArticleToFirebase } from '@lib/api/pushArticleToFirebase';
import {
  getArticleSummaryFromFirebase,
  getArticleFromFirebase,
  getBulkArticleSummaryFromFirebase,
} from '@lib/api/getArticleFromFirebase';
import '@extType/ExtendedServerSession';
import '@extType/ExtendedAdapterUser';
import { Locale } from '@type/Locale';
import {
  getAnnouncementFromFirebase,
  getAnnouncementSummaryFromFirebase,
  getBulkAnnouncementSummaryFromFirebase,
} from '@lib/api/getAnnounceFromFirebase';
import { GetAnnounceQueryType } from '@type/api/annouce/get';

export default async function getAnnounce(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET')
    return res.setHeader('Allow', ['GET']).status(405).json({ message: 'wrong methods' });
  const locale: Locale = (req.query.locale as Locale | undefined) || 'en';
  const { id }: GetAnnounceQueryType = req.query;
  const article = await getAnnouncementFromFirebase(locale, id!);
  return res
    .setHeader('Cache-Control', 's-maxage=59, staile-while-revalidate')
    .status(200)
    .json({ message: 'success', data: article });
}
