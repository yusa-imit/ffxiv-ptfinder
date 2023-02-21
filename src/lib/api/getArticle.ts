import { getItemById, getSummaryById } from '@lib/db/getItemById';
import { getCol } from '@lib/db/mongodb';
import { withPage } from '@lib/db/withPage';
import { getArticleType } from '@lib/getArticleType';
import { articleSummarizer } from '@lib/transform/articleSummarizer';
import { ArticleFromDB, ArticleFromDBSummary } from '@type/data/ArticleData';
import { WithId } from 'mongodb';
import { GlobalCache } from '../cache/GlobalCache';
import { dbIdRemover } from '../db/dbIdRemover';
import { mongodb_uris } from '../db/mongodb/environments';
import { UNDER_TEST } from './UNDER_TEST';

export async function getArticle(type: 0 | 1, id: string): Promise<ArticleFromDB> {
  if (type !== 0 && type !== 1) throw new Error('Invalid parameter');
  const col = await getCol(
    UNDER_TEST ? mongodb_uris.test : mongodb_uris.ishgard,
    UNDER_TEST ? 'test' : 'ishgard',
    getArticleType(type)
  );
  const data = await getItemById<WithId<ArticleFromDB>, ArticleFromDB>(
    col,
    id,
    dbIdRemover<WithId<ArticleFromDB>, ArticleFromDB>,
    getArticleType(type)
  );
  if (data !== null) return data;
  throw new Error('Failed to get article from db');
}

export async function getArticleSummary(type: 0 | 1, id: string): Promise<ArticleFromDBSummary> {
  const col = await getCol(
    UNDER_TEST ? mongodb_uris.test : mongodb_uris.ishgard,
    UNDER_TEST ? 'test' : 'ishgard',
    getArticleType(type)
  );
  const data = await getSummaryById<WithId<ArticleFromDB>, ArticleFromDB, ArticleFromDBSummary>(
    col,
    id,
    dbIdRemover,
    articleSummarizer,
    getArticleType(type)
  );
  if (data !== null) return data;
  throw new Error('Failed to get article from db');
}

export async function getBulkArticleSummary(
  type: 0 | 1,
  page: number = 1,
  size: number = 15,
  query?: string
): Promise<ArticleFromDBSummary[]> {
  const col = await getCol(
    UNDER_TEST ? mongodb_uris.test : mongodb_uris.ishgard,
    UNDER_TEST ? 'test' : 'ishgard',
    getArticleType(type)
  );
  const datas = await withPage<WithId<ArticleFromDB>>(col, page, size);
  return datas.map((data) => {
    const no_IdData = dbIdRemover<WithId<ArticleFromDB>, ArticleFromDB>(data);
    GlobalCache.getCache().put(
      GlobalCache.getKey(data.id, getArticleType(type)),
      no_IdData,
      GlobalCache.CACHE_TIMEOUT_MS
    );
    return articleSummarizer(no_IdData) as ArticleFromDBSummary;
  });
}
