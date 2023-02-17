import { ObjectId, WithId, Document, Collection } from 'mongodb';
import { GlobalCache } from '../cache/GlobalCache';

export async function getItemById<T extends WithId<Document>, R = Omit<T, '_id'>>(
  col: Collection,
  id: string,
  transformer: (data: T) => R | null,
  cachePrefix?: keyof typeof GlobalCache.CachePrefixes
): Promise<R | null> {
  const cachedValue = GlobalCache.getCache().get(GlobalCache.getKey(id, cachePrefix)) as null | T;
  if (cachedValue !== null) return transformer(cachedValue);
  const result = await col.findOne<T>({ id });
  if (result === null) return null;
  GlobalCache.getCache().put(
    GlobalCache.getKey(id, cachePrefix),
    result,
    GlobalCache.CACHE_TIMEOUT_MS
  );
  return transformer(result);
}

export async function getSummaryById<
  T extends WithId<Document>,
  B = Omit<T, '_id'>,
  R = Partial<B>
>(
  col: Collection,
  id: string,
  transformer: (data: T) => B | null,
  summarizer: (data: B | null) => R | null,
  cachePrefix?: keyof typeof GlobalCache.CachePrefixes
): Promise<R | null> {
  const data = await getItemById<T, B>(col, id, transformer, cachePrefix);
  return summarizer(data);
}
