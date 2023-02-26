import { Document } from 'mongodb';
import { Mongo, DBInitOptions } from './mongo';

let mongo: Mongo | null = null;

export async function getMongo(uri: string, options?: DBInitOptions) {
  if (mongo === null) {
    mongo = new Mongo(uri, options);
    await mongo.connect();
  }
  return mongo;
}

export async function getClient(uri: string, options?: DBInitOptions) {
  console.log(uri);
  return (await getMongo(uri, options)).getClient();
}

export async function getDB(uri: string, dbName: string, options?: DBInitOptions) {
  const mgc = await getMongo(uri, options);
  return (await mgc.getClient()).db(dbName);
}

export async function getCol<T extends Document>(
  uri: string,
  dbName: string,
  collectionName: string,
  options?: DBInitOptions
) {
  const db = await getDB(uri, dbName, options);
  return db.collection<T>(collectionName);
}
