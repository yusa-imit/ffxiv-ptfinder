import { initializeApp } from 'firebase/app';
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
  updateDoc,
} from 'firebase/firestore';
import { firebaseConfig } from '@pages/api/auth/api_config';
import { getConverter } from '@lib/firebaseConverter';
import { AdapterUser } from 'next-auth/adapters';
import { articleConverToDb } from '@lib/transform/articleConvertToDb';
import { DBArticle } from '@type/data/DBArticle';
import { getDB } from '@lib/db/getDB';
import { ArticleData } from '../../type/data/ArticleData';
import { getUserFromFirebase } from './getUserFromFirebase';

export async function pushArticleToFirebase(data: ArticleData, userId: string) {
  const db = getDB();
  const ArticleType = data.articleType === 0 ? 'recruits' : 'enlists';
  const Articles = collection(db, ArticleType).withConverter(getConverter<DBArticle>());
  const articleRef = await addDoc(Articles, {
    meta: {
      date: serverTimestamp(),
      userId,
    },
    article: articleConverToDb(data),
  });
  const articleSnapshot = await getDoc(articleRef);
  if (articleSnapshot.exists() && Articles.converter) {
    return articleSnapshot.id;
  }
  throw new Error('failed to send article to server');
}
