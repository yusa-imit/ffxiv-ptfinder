import { collection, getDocs } from 'firebase/firestore';
import { DBInstance } from '../../type/data/DBInstance';
import { getDB } from '../db/getDB';

export abstract class ContentStore {
  private static Content: Record<string, DBInstance> | null = null;
  static async Contents(): Promise<Record<string, DBInstance>> {
    return new Promise((res, rej) => {
      this.setContent().then((valid) => {
        if (valid) res(this.Content as Record<string, DBInstance>);
        else rej(new Error('Failed to retrieve data from database or ContentStore is null'));
      });
    });
  }
  private static async setContent(): Promise<boolean> {
    if (this.Content !== null) return true;
    try {
      const db = getDB();
      const col = collection(db, 'contents');
      const docs = await getDocs(col);
      const contents: { [key: string]: DBInstance } = {};
      docs.forEach((doc) => {
        contents[doc.id] = doc.data() as DBInstance;
      });
      this.Content = contents;
      return true;
    } catch {
      return false;
    }
  }
}
