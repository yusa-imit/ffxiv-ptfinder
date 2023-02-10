import { getContainer } from '../db/cosmos/cosmos';
import { getAnnounce, getAnnounceSummary, getBulkAnnounceSummary } from '../api/getAnnounce';
import { db_env } from '../db/cosmos/environments';
import { testAnnounce } from './testvalues';
import { containerOptions } from '../db/cosmos/containerOptions';

const testdbOption = { id: 'test' };

describe('api function test', () => {
  beforeAll(async () => {
    console.log(db_env);
    const test_announce_container = await getContainer(...containerOptions.announce, testdbOption);
    const length = (
      await test_announce_container.items.query('SELECT VALUE COUNT(1) FROM announce').fetchAll()
    ).resources[0];
    if (length < 31) {
      // eslint-disable-next-line no-restricted-syntax
      for (const item of testAnnounce) {
        // eslint-disable-next-line no-await-in-loop
        const res = await test_announce_container.items.create(item);
      }
    }
  });
  test('default get announce', async () => {
    expect(await getAnnounce('en', testAnnounce[0].id, testdbOption)).toEqual({
      title: testAnnounce[0].titles.en,
      type: testAnnounce[0].type,
      date: testAnnounce[0].date,
      description: testAnnounce[0].descriptions.en,
    });
  });
  test('default get summarized announce', async () => {
    expect(await getAnnounceSummary('en', testAnnounce[0].id, testdbOption)).toEqual({
      title: testAnnounce[0].titles.en,
      type: testAnnounce[0].type,
      date: testAnnounce[0].date,
    });
  });
  test('default get bulk summarized announce', async () => {
    expect(await getBulkAnnounceSummary('en', 2, 15)).toEqual(testAnnounce.slice(16, 31));
  });
});
