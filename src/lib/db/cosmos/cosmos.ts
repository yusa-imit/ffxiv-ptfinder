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
const container: Record<string, Container> = {};

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
  const key = dbOptions ? (dbOptions.id ? dbOptions.id : DEFAULT_DB_NAME) : DEFAULT_DB_NAME;
  if (db[key] === undefined) {
    db[key] = (
      await getClient().databases.createIfNotExists({ id: DEFAULT_DB_NAME, ...dbOptions })
    ).database;
  }
  return db[key];
}

export async function getContainer(
  body: ContainerRequest,
  options?: RequestOptions,
  dbOptions?: DatabaseRequest
): Promise<Container> {
  if (!body.id) throw new Error('Container Id is not defined');
  const containerKey = `${
    dbOptions ? (dbOptions.id ? dbOptions.id : DEFAULT_DB_NAME) : DEFAULT_DB_NAME
  }.${body.id}`;
  if (!container[body.id]) {
    container[containerKey] = (
      await (await getDB(dbOptions)).containers.createIfNotExists(body, options)
    ).container;
  }
  return container[containerKey];
}
