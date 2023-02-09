import { Container, SqlQuerySpec } from '@azure/cosmos';
import { PaginationCache } from '../../../type/PaginationCache';

export async function paginated<T>(
  q: SqlQuerySpec,
  container: Container,
  cache: PaginationCache | null,
  page: number,
  num: number
): Promise<{ data: T[]; cache: PaginationCache }> {
  const paginationCache = cache || ({} as PaginationCache);
  if (!paginationCache[num.toString()]) {
    paginationCache[num.toString()] = [undefined, undefined];
  }
  const cur_tokens = paginationCache[num.toString()];
  // page 1 is start
  // token[0], token[1] is predefined as undefined
  // token[2] is for page 2
  // requesting page 2 will initialize cache with token for page 3
  // for example, token[6] !== undefined means page 6's token is ready
  let cur_page =
    page <= cur_tokens.length - 1
      ? page
      : cur_tokens[cur_tokens.length - 1] === null
      ? cur_tokens.length - 2
      : cur_tokens.length - 1;
  let res: T[] = [];
  while (cur_page < page + 1) {
    const token = cur_tokens[cur_page] as string | undefined;
    // eslint-disable-next-line no-await-in-loop
    const { resources, hasMoreResults, continuationToken } = await container.items
      .query(q, {
        maxItemCount: num,
        continuationToken: token,
      })
      .fetchNext();
    if (resources) {
      cur_page++;
      res = resources;
      if (!hasMoreResults) {
        cur_tokens[cur_page] = null;
        break;
      } else cur_tokens[cur_page] = continuationToken;
    } else {
      throw new Error('Failed while trying query on announce');
    }
  }
  return {
    data: res,
    cache: paginationCache,
  };
}
