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

export async function pushArticleToFirebase(data: ArticleData, userId: string) {
  const db = getDB();
  const Users = collection(db, 'users').withConverter(getConverter<AdapterUser>());
  const userSnapshot = await getDoc(doc(Users, userId));
  if (!userSnapshot.exists()) throw new Error('User not exists');
  const UserData = userSnapshot.data();
  // TS-Error ignored for user data insertion
  /* eslint-disable no-param-reassign */
  data.author.name = UserData.name;
  data.author.verified = UserData.characters.length > 0;
  data.author.image = UserData.image || undefined;
  const Articles = collection(db, 'articles').withConverter(getConverter<DBArticle>());
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
