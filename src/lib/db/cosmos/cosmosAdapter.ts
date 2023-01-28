/* eslint-disable no-param-reassign */
import { ContainerRequest, CosmosClient, SqlQuerySpec, UniqueKey } from '@azure/cosmos';
import { Account } from 'next-auth';
import { Adapter, AdapterSession, AdapterUser } from 'next-auth/adapters';

const exceptSystemGenerated = (value: any) => {
  const { _etag, _rid, _self, _ts, ...others } = value;
  return others;
};
const exceptId = (value: any) => {
  const { id, ...others } = value;
  return others;
};

export default function MyAdapter(client: CosmosClient, options = {}): Adapter {
  const BULK_DELETE_PROCEDURE = 'bulkDelete';
  const getDb = async () => {
    return (await client.databases.createIfNotExists({ id: 'next-auth' })).database;
  };
  const getContainter = async (containerRequest: ContainerRequest) => {
    return (await (await getDb()).containers.createIfNotExists(containerRequest)).container;
  };
  const getUsers = async () => {
    return getContainter({
      id: 'users',
      partitionKey: '/id',
      uniqueKeyPolicy: { uniqueKeys: [{ paths: ['/email'] }] },
    });
  };
  const getSessions = async () => {
    return getContainter({ id: 'session' });
  };
  const getAccounts = async () => {
    return getContainter({ id: 'accounts' });
  };
  const getVerificationTokens = async () => {
    return getContainter({ id: 'verificationTokens' });
  };
  return {
    async createUser(user) {
      const users = await getUsers();
      const { resource } = await users.items.create(user);
      return exceptSystemGenerated(resource);
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
        query: `select a._self from ${str} a where a.userId=@userIdValue`,
        parameters: [{ name: '@userIdValue', value: userId }],
      });
      await users.item(userId).delete();
      // TODO
      await accounts.scripts.storedProcedure('bulkDelete').execute('/userId', [getQuery('str')]);
      await sessions.scripts.storedProcedure('bulkDelete').execute('/userId', [getQuery('str')]);
    },
    async linkAccount(account) {
      const accounts = await getAccounts();
      return (await accounts.items.create(account)).resource;
    },
    async unlinkAccount({ providerAccountId, provider }) {
      const accounts = await getAccounts();
      await accounts.scripts
        .storedProcedure('bulkDelete')
        .execute('/userId', [
          `select a._self from accounts a where a.provider=${provider} and a.providerAccountId=${providerAccountId} offset 0 limit 1`,
        ]);
    },
    async createSession(session) {
      const sessions = await getSessions();
      return exceptSystemGenerated((await sessions.items.create(session)).resource);
    },
    async getSessionAndUser(sessionToken) {
      const sessions = await getSessions();
      const sessionQuery: SqlQuerySpec = {
        query: 'select * from sessions s where s.sessionToken=@sessionTokenValue offset 0 limit 1',
        parameters: [{ name: '@sessionTokenValue', value: sessionToken }],
      };
      const { resources } = await sessions.items.query<AdapterSession>(sessionQuery).fetchAll();
      if (resources.length > 0) {
        const session = resources[0];
        const users = await getUsers();
        const user = (await users.item(session.userId).read<AdapterUser>()).resource;
        return { session: exceptSystemGenerated(session), user: exceptSystemGenerated(user) };
      }
      return null;
    },
    async updateSession(partialSession) {
      const sessions = await getSessions();
      const sessionQuery: SqlQuerySpec = {
        query: 'select * from session s where s.sessionToken=@sessionTokenValue offset 0 limit 1',
        parameters: [
          {
            name: '@sessionTokenValue',
            value: partialSession.sessionToken,
          },
        ],
      };
      const { resources } = await sessions.items
        .query<AdapterSession & { id: string }>(sessionQuery)
        .fetchAll();
      return exceptSystemGenerated(
        (await sessions.item(resources[0].id).replace(partialSession)).resource
      );
    },
    async deleteSession(sessionToken) {
      const sessions = await getSessions();
      const sessionQuery: SqlQuerySpec = {
        query: `select s.id from session s where s.sessionToken=${sessionToken}`,
      };
      await sessions
        .item((await sessions.items.query(sessionQuery).fetchAll()).resources[0].id)
        .delete();
    },
    async createVerificationToken(verificationToken) {
      const tokens = await getVerificationTokens();
      return exceptSystemGenerated((await tokens.items.create(verificationToken)).resource);
    },
    async useVerificationToken(verificationToken) {
      const tokens = await getVerificationTokens();
      const tokenQuery = `select t.id from verificationTokens t where t.identifier=${verificationToken.identifier} and where t.token=${verificationToken.token} offset 0 limit 1`;
      const { resources } = await tokens.items.query(tokenQuery).fetchAll();
      if (resources.length > 0) {
        const item = tokens.item(resources[0].id);
        const { id, ...token } = (await item.read()).resource;
        await item.delete();
        return token;
      }
      return null;
    },
  };
}
