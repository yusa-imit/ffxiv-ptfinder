import { AnnounceData } from '@type/data/AnnounceData';
import { Locale } from '@type/Locale';
import { getContainer } from '@lib/db/cosmos/cosmos';
import { containerOptions } from '@lib/db/cosmos/containerOptions';
import { exceptSystemGenerated, isoToTime } from '@lib/dbUtils';
import { SqlQuerySpec } from '@azure/cosmos';
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
};
