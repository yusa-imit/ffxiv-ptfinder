import { getContainer } from '../db/cosmos/cosmos';
import { getAnnounce, getAnnounceSummary, getBulkAnnounceSummary } from './getAnnounce';

const testAnnounces = new Array(31).map((v, i) => ({
  id: (i + 1).toString(),
  date: new Date().getTime(),
}));
const testdbOption = { id: 'test' };

describe('api function test', () => {
  beforeAll(async () => {
    const test_announce_container = await getContainer({ id: 'announce' }, {}, testdbOption);
    const length = (
      await test_announce_container.items.query('SELECT VALUE COUNT(1) FROM announce').fetchAll()
    ).resources[0];
    if (length < 31)
      await Promise.all(testAnnounces.map((v) => test_announce_container.items.create(v)));
  });
  test('default get announce', async () => {
    expect(await getAnnounce('en', '1')).toEqual({ id: 1 });
  });
  test('default get summarized announce', async () => {
    expect(await getAnnounceSummary('en', '1')).toEqual({ id: 1 });
  });
  test('default get bulk summarized announce', async () => {
    expect(await getBulkAnnounceSummary('en', 2, 15)).toEqual({
      '16': { id: 16 },
    });
  });
});
