import { NextApiRequest, NextApiResponse } from 'next';
import { ErrorDict } from '@constant/ErrorDict';
import { getContents } from '@lib/api/getContents';

export default async function query(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET')
    return res.status(405).setHeader('Allow', ['GET']).json(ErrorDict[1004]);

  try {
    const result = await getContents(req.query);
    return res.status(200).json(result);
  } catch (e) {
    if ((e as Error).message) {
      return res.status(400).json(ErrorDict[Number((e as Error).message)]);
    }
  }
  return res.status(400).json(ErrorDict[1005]);
}
