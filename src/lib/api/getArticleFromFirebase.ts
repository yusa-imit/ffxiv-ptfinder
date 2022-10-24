import { initializeApp } from 'firebase/app';
import type { FirebaseOptions } from 'firebase/app';
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  getFirestore,
  limit,
  query,
  runTransaction,
  setDoc,
  where,
  connectFirestoreEmulator,
  serverTimestamp,
  orderBy,
  startAfter,
} from 'firebase/firestore';
import { firebaseConfig } from '@pages/api/auth/api_config';
import { getConverter } from '@lib/firebaseConverter';
import { AdapterUser } from 'next-auth/adapters';
import { getDB } from '@lib/db/getDB';
import { summarizeArticle } from '@lib/transform/summarizeArticle';
import {
  ArticleData,
  ArticleDataSummaryWithMeta,
  ArticleDataWithMeta,
} from '../../type/data/ArticleData';
import { articleConverToData } from '../transform/articleConvertToData';
import { DBArticle } from '../../type/data/DBArticle';
import { GlobalCache } from '../cache/GlobalCache';

export async function getArticleFromFirebase(type: 0 | 1, articleId: string) {
  const cachedValue = GlobalCache.getCache().get(
    GlobalCache.getKey(articleId, type === 0 ? 'recruit' : 'enlist')
  ) as ArticleDataWithMeta;
  if (cachedValue !== null) return cachedValue;
  const db = getDB();
  const ArticleType = type === 0 ? 'recruits' : 'enlists';
  const Articles = collection(db, ArticleType).withConverter(getConverter<DBArticle>());
  const articleRef = doc(Articles, articleId);
  const articleSnapshot = await getDoc(articleRef);
  if (articleSnapshot.exists() && Articles.converter) {
    const data = articleConverToData(Articles.converter.fromFirestore(articleSnapshot));
    data.meta.articleId = articleSnapshot.id;
    GlobalCache.getCache().put(
      GlobalCache.getKey(articleId, type === 0 ? 'recruit' : 'enlist'),
      data
    );
    return data;
  }
  throw new Error('failed to get article from db');
}

export async function getArticleSummaryFromFirebase(
  type: 0 | 1,
  articleId: string
): Promise<ArticleDataSummaryWithMeta> {
  const data = await getArticleFromFirebase(type, articleId);
  return { meta: data.meta, article: summarizeArticle(data.article) };
}

/**
 *
 * @param options options for retrieving articles
 * @returns ArticleDataArray
 */
export async function getBulkArticleSummaryFromFirebase({
  type = 0,
  number = 15,
  page = 0,
}: {
  type: 0 | 1;
  number?: number;
  page?: number;
}) {
  try {
    const db = getDB();
    const ArticleType = type === 0 ? 'recruits' : 'enlists';
    const Articles = collection(db, ArticleType).withConverter(getConverter<DBArticle>());
    /**
    const ArticleLength: number = (await getDoc(doc(Articles, 'counterRefs'))).data()
      .totalCount as number;
    */
    let q = query(Articles, orderBy('meta.date'), limit(number));
    let articlesSnapshot = await getDocs(q);
    while (page !== 0 || articlesSnapshot.size >= number) {
      q = query(
        Articles,
        orderBy('meta.date'),
        startAfter(articlesSnapshot.docs[articlesSnapshot.size - 1]),
        limit(number)
      );
      // eslint-disable-next-line no-await-in-loop
      articlesSnapshot = await getDocs(q);
      // eslint-disable-next-line no-param-reassign
      page--;
    }
    const returner = [];
    for (let i = 0; i < articlesSnapshot.size; i++) {
      returner.push(articleConverToData(articlesSnapshot.docs[i].data()));
    }
    return returner;
  } catch (e) {
    throw new Error('failed to get article from db');
  }
}
