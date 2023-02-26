import { dbRoute } from '@lib/db/dbRoute';
import { getCol } from '@lib/db/mongodb';
import { mongodb_uris } from '@lib/db/mongodb/environments';
import { OptionalId } from 'mongodb';
import { nanoid } from 'nanoid';
import { PreDBAnnouceData, AnnounceData, DBAnnounceData } from '../../type/data/AnnounceData';
import { UNDER_TEST } from './UNDER_TEST';

export async function pushAnnounce(data: PreDBAnnouceData) {
  const col = await getCol(...dbRoute('announce'));
  const insertThis: OptionalId<DBAnnounceData> = { id: nanoid(), date: Date.now(), ...data };
  await col.insertOne(insertThis);
  return insertThis.id;
}
