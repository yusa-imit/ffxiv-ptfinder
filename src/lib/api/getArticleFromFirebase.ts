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
import { ArticleData } from '../../type/data/ArticleData';
import { articleConverToData } from '../transform/articleConvertToData';
import { DBArticle } from '../../type/data/DBArticle';

export async function getArticleFromFirebase(articleId: string) {
  const firebaseApp = initializeApp(firebaseConfig);
  const db = getFirestore(firebaseApp);
  const Articles = collection(db, 'articles').withConverter(getConverter<DBArticle>());
  const articleRef = doc(Articles, articleId);
  const articleSnapshot = await getDoc(articleRef);
  if (articleSnapshot.exists() && Articles.converter) {
    return articleConverToData(Articles.converter.fromFirestore(articleSnapshot));
  }
  throw new Error('failed to get article from db');
}

/**
 *
 * @param options options for retrieving articles
 * @returns ArticleDataArray
 */
export async function getBulkArticleFromFirebase({
  number = 15,
  page = 0,
}: {
  number?: number;
  page?: number;
}) {
  try {
    const firebaseApp = initializeApp(firebaseConfig);
    const db = getFirestore(firebaseApp);
    const Articles = collection(db, 'articles').withConverter(getConverter<DBArticle>());
    const ArticleLength: number = (await getDoc(doc(Articles, 'counterRefs'))).data()
      .totalCount as number;
    let q = query(Articles, orderBy('meta.date'), limit(number));
    let articlesSnapshot = await getDocs(q);
    while (page !== 0 && number * page < ArticleLength) {
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
