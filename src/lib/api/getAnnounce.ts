import { GlobalCache } from '@lib/cache/GlobalCache';
import { getCol } from '@lib/db/mongodb';
import { AnnounceData, AnnounceSummary, DBAnnounceData } from '@type/data/AnnounceData';
import { Locale } from '@type/Locale';
import { ObjectId } from 'mongodb';
import { mongodb_uris } from '../db/mongodb/environments';
import { summarizeAnnounce } from '../transform/summarizeAnnounce';

const UNDER_TEST = process.env.NODE_ENV === 'test';

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
  const col = await getCol(
    UNDER_TEST ? mongodb_uris.test : mongodb_uris.ishgard,
    UNDER_TEST ? 'test' : 'ishgard',
    'announce'
  );
  const result = await col.findOne<DBAnnounceData>({ id: new ObjectId(id) });
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
  if (page < 1 || size < 2) throw new Error('Invalid parameters');
  const col = await getCol(
    UNDER_TEST ? mongodb_uris.test : mongodb_uris.ishgard,
    UNDER_TEST ? 'test' : 'ishgard',
    'announce'
  );
  let data = await col.find<DBAnnounceData>({}).limit(size).sort('date', 'desc').toArray();
  if (!data.length) return [];
  let lastId: string = data[data.length]._id;
  let cur = 1;
  while (cur < page) {
    // eslint-disable-next-line no-await-in-loop
    data = await col
      .find<DBAnnounceData>({ _id: { $lt: new ObjectId(lastId) } })
      .limit(size)
      .sort('date', 'desc')
      .toArray();
    lastId = data[data.length]._id;
    cur++;
  }
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
