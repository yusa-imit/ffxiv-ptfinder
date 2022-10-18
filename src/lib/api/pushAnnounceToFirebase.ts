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
import { AnnounceData } from '@type/data/AnnounceData';
import { ArticleData } from '../../type/data/ArticleData';

export async function pushAnnounceToFirebase(data: AnnounceData, userId: string) {
  const db = getDB();
  const Users = collection(db, 'users').withConverter(getConverter<AdapterUser>());
  const userSnapshot = await getDoc(doc(Users, userId));
  if (!userSnapshot.exists()) throw new Error('User not exists');
  const UserData = userSnapshot.data();
  if (UserData.role !== 'admin') {
    throw new Error('Not Admin');
  }
  const Announcement = collection(db, 'articles').withConverter(getConverter<AnnounceData>());
  const articleRef = await addDoc(Announcement, {
    date: serverTimestamp(),
    type: data.type,
    title: data.title,
    description: data.description,
  });
  const articleSnapshot = await getDoc(articleRef);
  if (articleSnapshot.exists() && Announcement.converter) {
    return articleSnapshot.id;
  }
  throw new Error('failed to send article to server');
}
