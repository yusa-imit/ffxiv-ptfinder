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
} from 'firebase/firestore';
import { firebaseConfig } from '@pages/api/auth/api_config';
import { getConverter } from '@lib/firebaseConverter';
import { AdapterUser } from 'next-auth/adapters';
import { ArticleData } from '../../type/data/ArticleData';

type ArticleDatabase = {
  meta: {
    date: number;
    userId: string;
  };
  article: ArticleData;
};

export async function getArticleToFirebase(articleId: string) {
  const firebaseApp = initializeApp(firebaseConfig);
  const db = getFirestore(firebaseApp);
  const Articles = collection(db, 'articles').withConverter(getConverter<ArticleDatabase>());
  const articleRef = doc(Articles, articleId);
  const articleSnapshot = await getDoc(articleRef);
  if (articleSnapshot.exists() && Articles.converter) {
    return Articles.converter.fromFirestore(articleSnapshot);
  }
  throw new Error('failed to get article from db');
}
