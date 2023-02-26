import '@extType/ExtendedAdapterUser';
import '@extType/ExtendedServerSession';
import { getAnnounce } from '@lib/api/getAnnounce';
import { GetAnnounceQueryType } from '@type/api/annouce/get';
import { Locale } from '@type/Locale';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function apiAnnounceId(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET')
    return res.setHeader('Allow', ['GET']).status(405).json({ message: 'wrong methods' });
  const locale: Locale = (req.query.locale as Locale | undefined) || 'en';
  const { id }: GetAnnounceQueryType = req.query;
  const article = await getAnnounce(locale, id!);
  return res
    .setHeader('Cache-Control', 's-maxage=59, staile-while-revalidate')
    .status(200)
    .json({ message: 'success', data: article });
}
