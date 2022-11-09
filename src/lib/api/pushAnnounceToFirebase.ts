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
import { getUserFromFirebase } from './getUserFromFirebase';
import { PreDBAnnouceData, DBAnnounceData } from '../../type/data/AnnounceData';

export async function pushAnnounceToFirebase(data: PreDBAnnouceData) {
  const db = getDB();
  const Announcement = collection(db, 'announces').withConverter(getConverter<DBAnnounceData>());
  const articleRef = await addDoc(Announcement, {
    date: serverTimestamp(),
    type: data.type,
    titles: data.titles,
    descriptions: data.descriptions,
  });
  const articleSnapshot = await getDoc(articleRef);
  if (articleSnapshot.exists() && Announcement.converter) {
    return articleSnapshot.id;
  }
  throw new Error('failed to send article to server');
}
