import { MongoClient } from 'mongodb';

export class Mongo {
  client: MongoClient | null = null;
  private saved_uri: string | null = null;
  constructor(uri: string) {
    this.setClient(uri);
  }
  private setClient(uri: string) {
    this.saved_uri = uri;
    this.client = new MongoClient(uri);
  }
  async connect() {
    if (this.client === null) throw new Error('Cannot connect to db');
    this.client = await this.client.connect();
  }
  public async getClient(): Promise<MongoClient> {
    if (this.client === null) {
      if (this.saved_uri === null) throw new Error('Cannot Initialize mongodb client');
      this.setClient(this.saved_uri);
    }
    await this.connect();
    return this.client as MongoClient;
  }
}
