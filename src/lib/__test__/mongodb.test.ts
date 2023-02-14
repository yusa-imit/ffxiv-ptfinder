import { mongodb_uris } from '@lib/db/mongodb/environments';
import { MongoClient } from 'mongodb';

const uri = mongodb_uris.main;
const client = new MongoClient(uri);
describe('mongodb testing', () => {
  test('connection test', async () => {
    console.log('url ', uri);
    const thisclient = await client.connect();
    console.log('connected');
    expect(thisclient).toBeInstanceOf(MongoClient);
  });
});
