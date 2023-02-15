import { Collection, Filter, FindCursor, FindOptions, WithId, ObjectId } from 'mongodb';

interface WithPageOptions<T extends WithId<Document>> {
  sort?: [string, 'desc' | 'asc'];
  find?: [Filter<T>, FindOptions<T> | undefined];
}

export async function withPage<T extends WithId<Document>>(
  col: Collection,
  page: number,
  size: number,
  options?: WithPageOptions<T>
): Promise<T[]> {
  if (page < 0 || size < 1) return [];
  let data = await col
    .find<T>({})
    .limit(size)
    .sort(options?.sort ? options.sort : ['_id', 'desc'])
    .toArray();
  let cur = 1;
  let lastId = data[data.length]._id;
  while (cur < page) {
    // eslint-disable-next-line no-await-in-loop
    data = await col
      .find<T>({ _id: { $lt: new ObjectId(lastId) } })
      .limit(size)
      .sort(options?.sort ? options.sort : ['_id', 'desc'])
      .toArray();
    lastId = data[data.length]._id;
    cur++;
  }
  return data;
}
