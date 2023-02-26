import { getCol } from '@lib/db/mongodb';
import { mongodb_uris } from '@lib/db/mongodb/environments';
import { WithId } from 'mongodb';
import { DBInstance } from '../../type/data/DBInstance';
import { dbIdRemover } from '../db/dbIdRemover';
import { dbRoute } from '../db/dbRoute';

const UNDER_TEST = process.env.NODE_ENV === 'test';

export abstract class InstanceStore {
  private static Content: Record<string, DBInstance> | null = null;
  static async get(): Promise<Record<string, DBInstance>> {
    return new Promise((res, rej) => {
      this.set().then((valid) => {
        if (valid) res(this.Content as Record<string, DBInstance>);
        else rej(new Error('Failed to retrieve data from database or ContentStore is null'));
      });
    });
  }
  private static async set(): Promise<boolean> {
    if (this.Content !== null) return true;
    try {
      const col = await getCol(...dbRoute('instance'));
      const docs = col.find<WithId<DBInstance>>({});
      const contents: { [key: string]: DBInstance } = {};
      docs.forEach((doc) => {
        const without_id = dbIdRemover<WithId<DBInstance>, DBInstance>(doc);
        contents[without_id.code.toString()] = without_id;
      });
      this.Content = contents;
      return true;
    } catch {
      return false;
    }
  }
}
