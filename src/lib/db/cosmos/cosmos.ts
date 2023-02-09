import { Container, ContainerRequest, CosmosClient, Database, RequestOptions } from '@azure/cosmos';
import { db_env } from './environments';

let client: null | CosmosClient = null;
let db: Database | null = null;
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

export async function getDB(): Promise<Database> {
  if (db === null) {
    db = (await getClient().databases.createIfNotExists({ id: DEFAULT_DB_NAME })).database;
  }
  return db;
}

export async function getContainer(
  body: ContainerRequest,
  options: RequestOptions
): Promise<Container> {
  if (!body.id) throw new Error('Container Id is not defined');
  if (!container[body.id]) {
    container[body.id] = (
      await (await getDB()).containers.createIfNotExists(body, options)
    ).container;
  }
  return container[body.id];
}
