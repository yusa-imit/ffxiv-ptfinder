import { dbIdRemover } from '@lib/db/dbIdRemover';
import { getItemById } from '@lib/db/getItemById';
import { getCol } from '@lib/db/mongodb';
import { User } from '@type/data/User';
import { WithId } from 'mongodb';
import { mongodb_uris } from '../db/mongodb/environments';
import { UNDER_TEST } from './UNDER_TEST';
import { dbRoute } from '../db/dbRoute';

export async function getUser(id: string): Promise<User> {
  const col = await getCol(...dbRoute('user'));
  const data = await getItemById<WithId<User>, User>(col, id, dbIdRemover, 'user');
  if (data !== null) return data;
  throw new Error('Cannot retrieve user from db');
}
