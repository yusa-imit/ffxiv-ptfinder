import { unstable_getServerSession } from '@auth/next-auth/src';
import { NextApiRequest, NextApiResponse } from 'next';
import { ErrorResponse } from '@type/ErrorResponse';
import { authOptions } from '../../../pages/api/auth/[...nextauth]';
import '@extType/ExtendedServerSession';

interface AuthorData {
  name: string;
  verified: boolean;
  image: string;
}

export default async function getAuthorData(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<AuthorData | ErrorResponse> {
  if (req.method !== 'GET') return { message: 'unknown request method' };
  // @ts-ignore
  const session: Session | null = await unstable_getServerSession(req, res, authOptions);
  if (!session) {
    return { message: 'You must be logged in.' };
  }
  return {
    name: session.user.name,
    verified: session.user.characters.length > 0,
    image: session.user.image,
  };
}
