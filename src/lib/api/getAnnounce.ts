import { GlobalCache } from '@lib/cache/GlobalCache';
import { dbRoute } from '@lib/db/dbRoute';
import { getCol } from '@lib/db/mongodb';
import { withPage } from '@lib/db/withPage';
import { AnnounceData, AnnounceSummary, DBAnnounceData } from '@type/data/AnnounceData';
import { Locale } from '@type/Locale';
import { ObjectId } from 'mongodb';
import { mongodb_uris } from '../db/mongodb/environments';
import { summarizeAnnounce } from '../transform/summarizeAnnounce';
import { UNDER_TEST } from './UNDER_TEST';

export async function getAnnounce(locale: Locale, id: string): Promise<AnnounceData> {
  const cachedValue = GlobalCache.getCache().get(
    GlobalCache.getKey(id, 'announce')
  ) as null | DBAnnounceData;
  if (cachedValue !== null) {
    return {
      id: cachedValue.id,
      type: cachedValue.type,
      title: cachedValue.titles[locale],
      description: cachedValue.descriptions[locale],
      date: cachedValue.date,
    };
  }
  const col = await getCol(...dbRoute('announce'));
  const result = await col.findOne<DBAnnounceData>({ id });
  if (result === null) throw new Error('Failed to retreive anounce by id');
  else {
    GlobalCache.getCache().put(
      GlobalCache.getKey(id, 'announce'),
      result,
      GlobalCache.CACHE_TIMEOUT_MS
    );

    return {
      id: result.id,
      type: result.type,
      title: result.titles[locale],
      description: result.descriptions[locale],
      date: result.date,
    };
  }
}

export async function getAnnounceSummary(locale: Locale, id: string): Promise<AnnounceSummary> {
  const data = await getAnnounce(locale, id);
  return summarizeAnnounce(data);
}

export async function getBulkAnnounce(
  locale: Locale,
  page: number = 1,
  size: number = 15
): Promise<AnnounceSummary[]> {
  const col = await getCol(...dbRoute('announce'));
  const data = await withPage<DBAnnounceData>(col, page, size, { sort: ['date', 'desc'] });
  return data.map((single) => {
    GlobalCache.getCache().put(
      GlobalCache.getKey(single.id, 'announce'),
      single,
      GlobalCache.CACHE_TIMEOUT_MS
    );
    return {
      id: single.id,
      title: single.titles[locale],
      description: single.descriptions[locale],
      type: single.type,
      date: single.date,
    };
  });
}
