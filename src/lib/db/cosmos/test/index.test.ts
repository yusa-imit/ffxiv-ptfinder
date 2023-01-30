import { runBasicTests } from '@next-auth/adapter-test';
import https from 'node:https';
import { SqlQuerySpec } from '@azure/cosmos';
import MyAdapter from '../adapter';
import { getCosmos } from '../cosmos';

const db = getCosmos({
  clientOptions: {
    endpoint: 'https://ishgard-db.documents.azure.com:443/',
    key: 'ope0ZX0Mf3ZXX3J2GFks0PX3evcfys7AOP4FCDedN1d9ohn9GrBRwFDS2bpaBFQ8FhRBE3EeM8b4ACDbvLC2WQ==',
  },
});

const adapter = MyAdapter({
  clientOptions: {
    endpoint: 'https://ishgard-db.documents.azure.com:443/',
    key: 'ope0ZX0Mf3ZXX3J2GFks0PX3evcfys7AOP4FCDedN1d9ohn9GrBRwFDS2bpaBFQ8FhRBE3EeM8b4ACDbvLC2WQ==',
  },
});

runBasicTests({
  adapter: MyAdapter({
    clientOptions: {
      endpoint: 'https://ishgard-db.documents.azure.com:443/',
      key: 'ope0ZX0Mf3ZXX3J2GFks0PX3evcfys7AOP4FCDedN1d9ohn9GrBRwFDS2bpaBFQ8FhRBE3EeM8b4ACDbvLC2WQ==',
    },
  }),
  db: {
    async disconnect() {
      /*
      await (await db.accounts()).delete()
      await (await db.sessions()).delete()
      await (await db.tokens()).delete()
      await (await db.users()).delete()*/
    },
    async session(sessionToken) {
      const snapshotQuery: SqlQuerySpec = {
        query: `select * from sessions s where s.sessionToken=@sessionTokenValue offset 0 limit 1`,
        parameters: [{ name: '@sessionTokenValue', value: sessionToken }],
      };
      const { resources } = await (await db.sessions()).items.query(snapshotQuery).fetchAll();

      if (resources.length > 0) {
        return resources[0];
      }
      return null;
    },
    async user(id) {
      return adapter.getUser(id);
    },
    async account({ provider, providerAccountId }) {
      const snapshotQuery: SqlQuerySpec = {
        query:
          'select * from accounts a where a.provider=@providerValue and where a.providerAccountId=@providerAccountIdValue limit 1',
        parameters: [
          { name: '@providerValue', value: provider },
          { name: '@providerAccountIdValue', value: providerAccountId },
        ],
      };
      const { resources } = await (await db.accounts()).items.query(snapshotQuery).fetchAll();

      if (resources.length > 0) {
        return resources[0];
      }
      return null;
    },
    async verificationToken({ identifier, token }) {
      const snapshotQuery: SqlQuerySpec = {
        query: `select * from verificationToken v where v.identifider=@identifierValue and v.token=@tokenValue limit 1`,
        parameters: [
          { name: '@identifierValue', value: identifier },
          { name: '@tokenValue', value: token },
        ],
      };
      const { resources } = await (await db.tokens()).items.query(snapshotQuery).fetchAll();

      if (resources.length > 0) {
        return resources[0];
      }
    },
  },
});
