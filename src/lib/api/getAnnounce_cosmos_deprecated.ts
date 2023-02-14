import { AnnounceData } from '@type/data/AnnounceData';
import { Locale } from '@type/Locale';
import { getContainer } from '@lib/db/cosmos/cosmos';
import { containerOptions } from '@lib/db/cosmos/containerOptions';
import { exceptSystemGenerated, isoToTime } from '@lib/dbUtils';
import { DatabaseRequest, SqlQuerySpec, ContainerRequest } from '@azure/cosmos';
import { PaginationCache } from '@type/PaginationCache';
import { paginated } from '@lib/db/cosmos/paginated';
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

export async function getAnnounce(
  locale: Locale,
  id: string,
  dbOptions?: DatabaseRequest,
  disableCache?: boolean
): Promise<AnnounceData> {
  const cacheValue = disableCache
    ? null
    : (GlobalCache.getCache().get(GlobalCache.getKey(id, 'announce')) as null | DBAnnounceData);
  if (cacheValue !== null) {
    return getLocalData(locale, cacheValue);
  }
  const conatiner = await getContainer(...containerOptions.announce, dbOptions);
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

export async function getAnnounceSummary(locale: Locale, id: string, dbOptions?: DatabaseRequest) {
  const data = await getAnnounce(locale, id, dbOptions);
  return summarizeAnnounce(data);
}

export async function getBulkAnnounceSummary(
  locale: Locale,
  page: number,
  num: number,
  dbOptions?: DatabaseRequest
): Promise<Record<string, AnnounceSummary>> {
  if (page <= 0 || num <= 0) throw new Error('Invalid parameters');
  const container = await getContainer(...containerOptions.announce, dbOptions);
  const q: SqlQuerySpec = {
    query: 'select * from c', // order by c.date desc',
  };
  const cacheKey = GlobalCache.getKey(`${page}:${num}`, 'announce_pagination');
  const checkPageCache = GlobalCache.getCache().get(cacheKey) as null | PaginationCache;
  const { data, cache } = await paginated(q, container, checkPageCache, page, num);
  GlobalCache.getCache().put(cacheKey, cache);
  const result: Record<string, AnnounceSummary> = {};
  data.forEach((v) => {
    const value = exceptSystemGenerated<DBAnnounceData & { id: string }>(v);
    GlobalCache.getCache().put(GlobalCache.getKey(value.id, 'announce'), value);
    result[value.id] = summarizeAnnounce(getLocalData(locale, value));
  });
  return result;
}
