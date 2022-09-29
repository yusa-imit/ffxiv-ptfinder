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

export async function pushArticleToFirebase(data: ArticleData, userId: string) {
  const firebaseApp = initializeApp(firebaseConfig);
  const db = getFirestore(firebaseApp);
  const Users = collection(db, 'users').withConverter(getConverter<AdapterUser>());
  const userSnapshot = await getDoc(doc(Users, userId));
  if (!userSnapshot.exists()) throw new Error('User not exists');
  const Articles = collection(db, 'articles').withConverter(getConverter<ArticleDatabase>());
  const articleRef = await addDoc(Articles, {
    meta: {
      date: serverTimestamp(),
      userId,
    },
    article: JSON.stringify(data),
  });
  const articleSnapshot = await getDoc(articleRef);
  if (articleSnapshot.exists() && Articles.converter) {
    return articleSnapshot.id;
  }
  throw new Error('failed to send article to server');
}
