import { AnnounceData } from '@type/data/AnnounceData';
import { Locale } from '@type/Locale';
import { getContainer } from '@lib/db/cosmos/cosmos';
import { containerOptions } from '@lib/db/cosmos/containerOptions';
import { exceptSystemGenerated, isoToTime } from '@lib/dbUtils';
import { SqlQuerySpec } from '@azure/cosmos';
import { PaginationCache } from '@type/PaginationCache';
import { GlobalCache } from '../cache/GlobalCache';
import { DBAnnounceData, AnnounceSummary } from '../../type/data/AnnounceData';
import { summarizeAnnounce } from '../transform/summarizeAnnounce';

const getLocalData = (locale: Locale, value: DBAnnounceData): AnnounceData => {
  return {
    type: value.type,
    title: value.titles[locale],
    description: value.descriptions[locale],
    date: value.date,
  };
};

export async function getAnnounce(locale: Locale, id: string): Promise<AnnounceData> {
  const cacheValue = GlobalCache.getCache().get(
    GlobalCache.getKey(id, 'announce')
  ) as null | DBAnnounceData;
  if (cacheValue !== null) {
    return getLocalData(locale, cacheValue);
  }
  const conatiner = await getContainer(...containerOptions.announce);
  const { resource } = await conatiner.item(id).read();
  if (resource) {
    const data = exceptSystemGenerated<DBAnnounceData>(resource);
    GlobalCache.getCache().put(
      GlobalCache.getKey(id, 'announce'),
      data,
      GlobalCache.CACHE_TIMEOUT_MS
    );
    return getLocalData(locale, data);
  }
  throw new Error('failed to get Announcement from db');
}

export async function getAnnounceSummary(locale: Locale, id: string) {
  const data = await getAnnounce(locale, id);
  return summarizeAnnounce(data);
}

interface GetBulkAnnounceSummary {
  (locale: Locale, page: number, num: number): Promise<Record<string, AnnounceSummary>>;
}

export const getBulkAnnounceSummary: GetBulkAnnounceSummary = async function (locale, page, num) {
  if (page <= 0 || num <= 0) throw new Error('Invalid parameters');
  const container = await getContainer(...containerOptions.announce);
  const q: SqlQuerySpec = {
    query: 'select * from announce c order by c.date desc',
  };
  const checkPageCache = GlobalCache.getCache().get(
    GlobalCache.getKey('', 'announce_pagination')
  ) as null | PaginationCache;
  const paginationCache = checkPageCache || ({} as PaginationCache);
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
  let res: any[];
  const result: Record<string, AnnounceSummary> = {};
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
  // @ts-ignore
  res.forEach((v) => {
    const value = exceptSystemGenerated<DBAnnounceData & { id: string }>(v);
    GlobalCache.getCache().put(GlobalCache.getKey(value.id, 'announce'), value);
    result[value.id] = summarizeAnnounce(getLocalData(locale, value));
  });
  return result;
};
