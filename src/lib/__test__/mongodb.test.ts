import { getAnnounce, getAnnounceSummary, getBulkAnnounce } from '@lib/api/getAnnounce';
import { mongodb_uris } from '@lib/db/mongodb/environments';
import { Mongo } from '@lib/db/mongodb/mongo';
import { getCol, getMongo } from '@lib/db/mongodb/singleton';
import { MongoClient, Collection } from 'mongodb';
import { DBAnnounceData } from '../../type/data/AnnounceData';
import { testAnnounce } from './testValues/testAnnounce';
import appendData from './appendData';

describe('mongodb testing', () => {
  const uri = mongodb_uris.test;
  let test_client: Mongo;
  let col_ann: Collection;
  let ann_single_test_target: DBAnnounceData;
  beforeAll(async () => {
    await appendData();
    test_client = await getMongo(uri);
    col_ann = await getCol(uri, 'test', 'announce');
    ann_single_test_target = (await col_ann.findOne<DBAnnounceData>({})) as DBAnnounceData;
  });
  test('get announce test', async () => {
    const test = await getAnnounce('en', ann_single_test_target.id);
    expect(test).toEqual({
      id: ann_single_test_target.id,
      title: ann_single_test_target.titles.en,
      description: ann_single_test_target.descriptions.en,
      date: ann_single_test_target.date,
      type: ann_single_test_target.type,
    });
  });

  test('get announce summary test', async () => {
    const test = await getAnnounceSummary('en', ann_single_test_target.id);
    expect(test).toEqual({
      id: ann_single_test_target.id,
      title: ann_single_test_target.titles.en,
      date: ann_single_test_target.date,
      type: ann_single_test_target.type,
    });
  });

  test('get bulk announce summary test', async () => {
    const tests = await getBulkAnnounce('en', 2, 15);
    expect(tests).toHaveLength(15);
    const sorted = testAnnounce.sort((a, b) => b.date - a.date);
    expect(tests[0]).toHaveProperty('date', sorted[15].date);
    expect(tests[14]).toHaveProperty('date', sorted[29].date);
  });
  test('get bulk announce range exceeded', async () => {
    const tests = await getBulkAnnounce('en', 5, 15);
    expect(tests).toHaveLength(0);
  });
  afterAll(async () => {
    await (await test_client.getClient()).close();
  });
});
