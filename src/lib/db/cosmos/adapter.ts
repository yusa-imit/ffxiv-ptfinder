import { SqlQuerySpec } from '@azure/cosmos';
import { Adapter, AdapterSession, AdapterUser, AdapterAccount } from 'next-auth/adapters';
import { v4 } from 'uuid';
import { CosmosDBInitOptions, getCosmos } from './cosmos';

const exceptSystemGenerated = (value: any) => {
  if (value === undefined) {
    console.log('value was this: ', value);
    return;
  }
  const { _etag, _rid, _self, _ts, _attatchments, ...others } = value;
  return others;
};

export default function MyAdapter(options: CosmosDBInitOptions): Adapter {
  const BULK_DELETE_PROCEDURE = 'bulkDelete';
  const db = getCosmos(options);
  return {
    async createUser(user) {
      const functionUUID = v4();
      console.log(`Function ${functionUUID} started`);
      const users = await db.users();
      const { resource } = await users.items.create(user);
      console.log(resource);
      console.log(`Function ${functionUUID} ended`);
      return exceptSystemGenerated(resource);
    },
    async getUser(id) {
      const functionUUID = v4();
      console.log(`Function getUser ${functionUUID} started`);
      const users = await db.users();

      const { resource, statusCode } = await users.item(id).read();
      console.log(resource, statusCode);
      console.log(`Function getUser ${functionUUID} ended`);
      if (resource === undefined) return null;
      return exceptSystemGenerated(resource);
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

      const users = await db.users();
      const { resources } = await users.items.query(querySpec).fetchAll();
      if (resources.length > 0) return exceptSystemGenerated(resources[0]);
      return null;
    },
    async getUserByAccount({ providerAccountId, provider }) {
      const querySpec: SqlQuerySpec = {
        query:
          'select * from accounts a where a.provider=@providerValue and a.providerAccountId=@providerAccountIdValue offset 0 limit 1',
        parameters: [
          { name: '@providerValue', value: provider },
          { name: '@providerAccountIdValue', value: providerAccountId },
        ],
      };
      const accounts = await db.accounts();
      const { resources: account_result } = await accounts.items
        .query<AdapterAccount>(querySpec)
        .fetchAll();
      if (account_result.length > 0) {
        const { userId } = account_result[0] as AdapterAccount;
        const { resource } = await (await db.users()).item(userId).read();
        return exceptSystemGenerated(resource);
      }
      return null;
    },
    async updateUser(user) {
      try {
        const users = await db.users();
        const { resource } = await users.item(user.id as string).replace(user);
        return exceptSystemGenerated(resource);
      } catch {
        throw new Error('update user failed to update user');
      }
    },
    async deleteUser(userId) {
      const users = await db.users();
      const accounts = await db.accounts();
      const sessions = await db.sessions();

      await users.item(userId).delete();
      const { resources: accountBulk } = await accounts.scripts.storedProcedures
        .query({
          query: 'select r.id from root r where r.id=@bulk',
          parameters: [{ name: '@bulk', value: BULK_DELETE_PROCEDURE }],
        })
        .fetchAll();
      if (accountBulk.length === 0) {
        await accounts.scripts.storedProcedures.create({
          id: BULK_DELETE_PROCEDURE,
          body: require('./bulkDelete'),
        });
      }
      const { resources: sessionBulk } = await sessions.scripts.storedProcedures
        .query({
          query: 'select r.id from root r where r.id=@bulk',
          parameters: [{ name: '@bulk', value: BULK_DELETE_PROCEDURE }],
        })
        .fetchAll();
      if (sessionBulk.length === 0) {
        await sessions.scripts.storedProcedures.create({
          id: BULK_DELETE_PROCEDURE,
          body: require('./bulkDelete'),
        });
      }
      await accounts.scripts.storedProcedure('bulkDelete').execute('/userId', [
        {
          query: `select a._self from accounts a where a.userId=@userIdValue`,
          parameters: [{ name: '@userIdValue', value: userId }],
        },
      ]);
      await sessions.scripts.storedProcedure('bulkDelete').execute('/userId', [
        {
          query: `select a._self from sessions s where s.userId=@userIdValue`,
          parameters: [{ name: '@userIdValue', value: userId }],
        },
      ]);
    },
    async linkAccount(account) {
      const accounts = await db.accounts();
      return (await accounts.items.create(account)).resource;
    },
    async unlinkAccount({ providerAccountId, provider }) {
      const accounts = await db.accounts();
      await accounts.scripts.storedProcedure('bulkDelete').execute('/userId', [
        {
          query:
            'select a._self from accounts a where a.provider=@providerValue and where a.providerAccountId=@accountIdValue offset 0 limit 1',
          parameter: [
            { name: '@privoderValue', value: provider },
            { name: '@accountIdValue', value: providerAccountId },
          ],
        },
      ]);
    },
    async createSession(session) {
      const sessions = await db.sessions();
      return exceptSystemGenerated((await sessions.items.create(session)).resource);
    },
    async getSessionAndUser(sessionToken) {
      const sessions = await db.sessions();
      const sessionQuery: SqlQuerySpec = {
        query: 'select * from sessions s where s.sessionToken=@sessionTokenValue offset 0 limit 1',
        parameters: [{ name: '@sessionTokenValue', value: sessionToken }],
      };
      const { resources } = await sessions.items.query<AdapterSession>(sessionQuery).fetchAll();
      if (resources.length > 0) {
        const session = resources[0] as AdapterSession;
        const users = await db.users();
        const user = (await users.item(session.userId).read<AdapterUser>()).resource;
        return {
          session: exceptSystemGenerated(session),
          user: exceptSystemGenerated(user),
        };
      }
      return null;
    },
    async updateSession(partialSession) {
      const sessions = await db.sessions();
      const sessionQuery: SqlQuerySpec = {
        query: 'select * from sessions s where s.sessionToken=@sessionTokenValue offset 0 limit 1',
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
        (
          await sessions
            .item((resources[0] as AdapterSession & { id: string }).id)
            .replace(partialSession)
        ).resource
      );
    },
    async deleteSession(sessionToken) {
      const sessions = await db.sessions();
      const sessionQuery: SqlQuerySpec = {
        query: `select s.id from sessions s where s.sessionToken=@sessionTokenValue`,
        parameters: [{ name: '@sessionTokenValue', value: sessionToken }],
      };
      await sessions
        .item((await sessions.items.query(sessionQuery).fetchAll()).resources[0].id)
        .delete();
    },
    async createVerificationToken(verificationToken) {
      const tokens = await db.tokens();
      return exceptSystemGenerated((await tokens.items.create(verificationToken)).resource);
    },
    async useVerificationToken(verificationToken) {
      const tokens = await db.tokens();
      const tokenQuery: SqlQuerySpec = {
        query:
          'select t.id from verificationTokens t where t.identifier=@verificationTokenIdentifier and where t.token=@verificationTokenToken offset 0 limit 1',
        parameters: [
          {
            name: '@verificationTokenIdentifier',
            value: verificationToken.identifier,
          },
          { name: '@verificationTokenToken', value: verificationToken.token },
        ],
      };
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
