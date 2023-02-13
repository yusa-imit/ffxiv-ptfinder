import { Mongo } from './mongo';

let mongo: Mongo | null = null;

export async function db(uri: string) {
  if (mongo === null) {
    mongo = new Mongo(uri);
    await mongo.connect();
  }
  return mongo;
}
