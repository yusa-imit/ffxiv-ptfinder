import { Container, CosmosClient, Database } from '@azure/cosmos';
import { db_env } from './environments';

abstract class CosmosInterface {
  private static client: null | CosmosClient = null;
  private static db: Record<string, Database> = {};
  private static container: Record<string, Record<string, Container>> = {};
  public static getClient() {
    if (this.client === null) {
      this.client = new CosmosClient({ endpoint: db_env.uri, key: db_env.p_key });
    }
    return this.client;
  }
  public static async getDb(name: string) {
    if (!this.db[name]) {
      this.db[name] = (await this.getClient().databases.createIfNotExists({ id: name })).database;
    }
    return this.db[name];
  }
  public static async getContainer(
    dbName: string,
    containerName: string,
    partitionKey?: string | string[]
  ) {
    if (!this.container[dbName]) {
      this.container[dbName] = {};
    }
    if (!this.container[dbName][containerName]) {
      const db = await this.getDb(dbName);
      this.container[dbName][containerName] = (
        await db.containers.createIfNotExists({
          id: containerName,
          // if partition key is not defined, then throw undefined,
          // when partition key is defined and typeof string, then throw it,
          // when partition key is defined and string[], return PartitionKeyDefinition
          partitionKey: !partitionKey
            ? undefined
            : typeof partitionKey === 'string'
            ? partitionKey
            : { paths: partitionKey },
        })
      ).container;
    }
    return this.container[dbName][containerName];
  }
}

export default CosmosInterface;
