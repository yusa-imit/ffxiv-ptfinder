import { Collection } from 'mongodb';

export interface DBStat {
  count: number;
  maxPage: number;
}

export async function getDocCount(col: Collection) {
  const number = await col.countDocuments({});
  return number;
}

export async function getStat(col: Collection, size: number): Promise<DBStat> {
  const count = await getDocCount(col);
  return {
    count,
    maxPage: Number((count / size).toFixed()) + 1,
  };
}
