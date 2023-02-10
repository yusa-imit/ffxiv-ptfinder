import {
  Container,
  ContainerRequest,
  CosmosClient,
  Database,
  DatabaseRequest,
  RequestOptions,
} from '@azure/cosmos';
import { db_env } from './environments';

let client: null | CosmosClient = null;
const db: Record<string, Database> = {};
const container: Record<string, Record<string, Container>> = {};

const DEFAULT_DB_NAME = 'ishgard';

function getClient(): CosmosClient {
  if (client === null) {
    client = new CosmosClient({
      endpoint: db_env.uri,
      key: db_env.p_key,
    });
  }
  return client;
}

export async function getDB(dbOptions?: DatabaseRequest): Promise<Database> {
  if (db[dbOptions?.id || DEFAULT_DB_NAME] === undefined) {
    db[dbOptions?.id || DEFAULT_DB_NAME] = (
      await getClient().databases.createIfNotExists(dbOptions || { id: DEFAULT_DB_NAME })
    ).database;
  }
  return db[dbOptions?.id || DEFAULT_DB_NAME];
}

export async function getContainer(
  body: ContainerRequest,
  options: RequestOptions,
  dbOptions?: DatabaseRequest
): Promise<Container> {
  if (!body.id) throw new Error('Container Id is not defined');
  if (!container[body.id]) {
    container[dbOptions?.id || DEFAULT_DB_NAME][body.id] = (
      await (await getDB(dbOptions)).containers.createIfNotExists(body, options)
    ).container;
  }
  return container[dbOptions?.id || DEFAULT_DB_NAME][body.id];
}
