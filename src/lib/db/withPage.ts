import { Collection, Filter, FindCursor, FindOptions, WithId, ObjectId, Document } from 'mongodb';
import { GlobalCache } from '../cache/GlobalCache';

interface WithPageOptions<T extends WithId<Document>> {
  sort?: [string, 'desc' | 'asc'];
  find?: [Filter<T>, FindOptions<T> | undefined];
}

type PageCache = (string | undefined)[] | (ObjectId | undefined)[];
type PageCacheObject = { [key: string]: PageCache };

export async function withPage<T extends WithId<Document>>(
  col: Collection<Document>,
  page: number,
  size: number,
  options?: WithPageOptions<T>
): Promise<T[]> {
  if (page < 0 || size < 1) return [];
  let pageKeyObject = GlobalCache.getCache().get(
    `${col.dbName}|${col.collectionName}|${size}`
  ) as null | PageCacheObject;
  if (pageKeyObject === null) pageKeyObject = {};
  if (pageKeyObject[JSON.stringify(options)] === undefined)
    pageKeyObject[JSON.stringify(options)] = [undefined, undefined];
  const curKey = pageKeyObject[JSON.stringify(options)];
  const pageKey = page > curKey.length ? curKey[curKey.length - 1] : curKey[page];
  let data = await col
    .find<T>(
      options !== undefined && options.sort !== undefined
        ? Object.assign(
            options.find ? options.find : {},
            pageKey !== undefined
              ? {
                  [options.sort[0]]:
                    options.sort[1] === 'desc' ? { $lt: pageKey } : { $gt: pageKey },
                }
              : {}
          )
        : pageKey !== undefined
        ? { _id: { $lt: new ObjectId(pageKey) } }
        : {}
    )
    .limit(size)
    .sort(options?.sort ? options.sort : ['_id', 'desc'])
    .toArray();
  if (data.length === 0) return [];
  let cur = page > curKey.length - 1 ? curKey.length - 1 : page;
  let lastValue = options?.sort ? data[data.length - 1][options.sort[0]] : undefined;
  let lastId: ObjectId | undefined = data[data.length - 1]._id;
  while (cur < page) {
    // eslint-disable-next-line no-await-in-loop
    data = await col
      .find<T>(
        options !== undefined && options.sort !== undefined
          ? Object.assign(
              options.find ? options.find : {},
              lastValue !== undefined
                ? {
                    [options.sort[0]]:
                      options.sort[1] === 'desc' ? { $lt: lastValue } : { $gt: lastValue },
                  }
                : {}
            )
          : lastId === undefined
          ? {}
          : { _id: { $lt: new ObjectId(lastId) } }
      )
      .limit(size)
      .sort(options !== undefined && options.sort !== undefined ? options.sort : ['_id', 'desc'])
      .toArray();
    if (data.length !== 0) {
      if (options?.sort) {
        lastValue = data[data.length - 1][options.sort[0]];
      }
      lastId = data[data.length - 1]._id;
    }
    curKey[cur + 1] = options !== undefined && options.sort !== undefined ? lastValue : lastId;
    cur++;
  }
  GlobalCache.getCache().put(
    `${col.dbName}|${col.collectionName}|${size}`,
    pageKeyObject,
    GlobalCache.CACHE_TIMEOUT_MS
  );
  return data;
}
