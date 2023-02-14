import { getCol } from '@lib/db/mongodb';
import { nanoid } from 'nanoid';
import { mongodb_uris } from '../db/mongodb/environments';
import { testAnnounce } from './testValues/testAnnounce';

describe('Initialize test data', () => {
  test('Announce Data', async () => {
    const col = await getCol(mongodb_uris.test, 'test', 'announce');
    let number = await col.countDocuments();
    if (number < testAnnounce.length) {
      col.deleteMany({});
      await col.insertMany(testAnnounce.map((v) => ({ id: nanoid(), ...v })));
      number = await col.countDocuments();
    }
    expect(number).toBe(testAnnounce.length);
  });
});
