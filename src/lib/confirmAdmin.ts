import { unstable_getServerSession } from '@auth/next-auth/src';
import { NextApiRequest, NextApiResponse } from 'next';
import { authOptions } from '../../pages/api/auth/[...nextauth]';
import '@extType/ExtendedServerSession';

export default async function confirmAdmin(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<{ isAdmin: boolean; message?: string }> {
  if (req.method !== 'GET') return { isAdmin: false, message: 'unknown request method' };
  // @ts-ignore
  const session: Session | null = await unstable_getServerSession(req, res, authOptions);
  if (!session) {
    return { message: 'You must be logged in.', isAdmin: false };
  }
  if (session.user.role === 'admin') {
    return { isAdmin: true };
  }
  return { isAdmin: false, message: 'You are not admin.' };
}
