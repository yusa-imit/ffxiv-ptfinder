/* eslint-disable no-console */
import { getCol } from '@lib/db/mongodb';
import { Collection } from 'mongodb';
import { nanoid } from 'nanoid';
import { mongodb_uris } from '../db/mongodb/environments';
import { testAnnounce } from './testValues/testAnnounce';
import { testInstance } from './testValues/testInstance';

async function appendData() {
  async function insert(col: Collection, data: any[]) {
    let number = await col.countDocuments();
    if (number < data.length) {
      await col.deleteMany({});
      await col.insertMany(data.map((v) => ({ id: nanoid(), ...v })));
      number = await col.countDocuments();
    }
    return number;
  }
  async function announceData() {
    const announce = await getCol(mongodb_uris.test, 'test', 'announce');
    const number = await insert(announce, testAnnounce);
    if (number === testAnnounce.length) console.log('Test Announce Inserted');
  }
  async function instanceData() {
    const instance = await getCol(mongodb_uris.test, 'test', 'instances');
    const number = await insert(
      instance,
      Array.from(Object.keys(testInstance), (v) => testInstance[Number(v)])
    );
    if (number === Object.keys(testInstance).length) console.log('Test Instance Inserted');
  }
  async function run() {
    await announceData();
    await instanceData();
  }
  run();
}

export default appendData;
