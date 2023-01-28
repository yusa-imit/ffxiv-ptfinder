/* eslint-disable no-param-reassign */
import { ContainerRequest, CosmosClient, SqlQuerySpec, UniqueKey } from '@azure/cosmos';
import { Account } from 'next-auth';
import { Adapter } from 'next-auth/adapters';
import { parameters } from '../../../../.storybook/preview';

const exceptSystemGenerated = (value: any) => {
  const { _etag, _rid, _self, _ts, ...others } = value;
  return others;
};
const exceptId = (value: any) => {
  const { id, ...others } = value;
  return others;
};

export default function MyAdapter(client: CosmosClient, options = {}): Adapter {
  const getDb = async function () {
    return (await client.databases.createIfNotExists({ id: 'next-auth' })).database;
  };
  const getContainter = async function (containerRequest: ContainerRequest) {
    return (await (await getDb()).containers.createIfNotExists(containerRequest)).container;
  };
  const getUsers = async function () {
    return getContainter({
      id: 'users',
      partitionKey: '/id',
      uniqueKeyPolicy: { uniqueKeys: [{ paths: ['/email'] }] },
    });
  };
  const getSessions = async function () {
    return getContainter({ id: 'session' });
  };
  const getAccounts = async function () {
    return getContainter({ id: 'accounts' });
  };
  const getVerificationTokens = async function () {
    return getContainter({ id: 'verificationTokens' });
  };
  return {
    async createUser(user) {
      const users = await getUsers();
      const { resource } = await users.items.create(user);
      return exceptSystemGenerated(exceptId(resource));
    },
    async getUser(id) {
      const users = await getUsers();
      try {
        const { resource } = await users.item(id).read();
        return exceptSystemGenerated(resource);
      } catch {
        return null;
      }
    },
    async getUserByEmail(email) {
      const querySpec: SqlQuerySpec = {
        query: 'select * from users u where u.email=@emailValue',
        parameters: [
          {
            name: '@emailValue',
            value: email,
          },
        ],
      };
      try {
        const users = await getUsers();
        const { resources } = await users.items.query(querySpec).fetchAll();
        return exceptSystemGenerated(resources[0]);
      } catch {
        return null;
      }
    },
    async getUserByAccount({ providerAccountId, provider }) {
      try {
        const querySpec: SqlQuerySpec = {
          query:
            'select * from accounts a where a.provider=@providerValue and a.providerAccountId=@providerAccountIdValue offset 0 limit 1',
          parameters: [
            { name: '@providerValue', value: provider },
            { name: '@providerAccountIdValue', value: providerAccountId },
          ],
        };
        const accounts = await getAccounts();
        const { resources: account_result } = await accounts.items
          .query<Account>(querySpec)
          .fetchAll();
        if (account_result.length > 0) {
          const { userId } = account_result[0];
          // @ts-ignore
          const { resource } = await (await getUsers()).item(userId).read();
          return exceptSystemGenerated(resource);
        }
        throw new Error();
      } catch {
        return null;
      }
    },
    async updateUser(user) {
      try {
        const users = await getUsers();
        const { resource } = await users.item(user.id as string).replace(user);
        return exceptSystemGenerated(resource);
      } catch {
        throw new Error('update user failed to update user');
      }
    },
    async deleteUser(userId) {
      const users = await getUsers();
      const accounts = await getAccounts();
      const sessions = await getSessions();

      const getQuery: (str: string) => SqlQuerySpec = (str) => ({
        query: `select * from ${str} a where a.userId=@userIdValue`,
        parameters: [{ name: '@userIdValue', value: userId }],
      });
      await users.item(userId).delete();
      // TODO
    },
    async linkAccount(account) {},
    async unlinkAccount({ providerAccountId, provider }) {},
    async createSession({ sessionToken, userId, expires }) {},
    async getSessionAndUser(sessionToken) {},
    async updateSession({ sessionToken }) {},
    async deleteSession(sessionToken) {},
    async createVerificationToken({ identifier, expires, token }) {},
    async useVerificationToken({ identifier, token }) {},
  };
}
