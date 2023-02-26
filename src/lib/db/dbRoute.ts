import { UNDER_TEST } from '@lib/api/UNDER_TEST';
import { mongodb_uris } from './mongodb/environments';

export function dbRoute(collectionName: string): [string, string, string] {
  return [
    UNDER_TEST ? mongodb_uris.test : mongodb_uris.ishgard,
    UNDER_TEST ? 'test' : 'ishgard',
    collectionName,
  ];
}
