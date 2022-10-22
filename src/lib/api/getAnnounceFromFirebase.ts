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
import { ArticleData } from '../../type/data/ArticleData';
import { articleConverToData } from '../transform/articleConvertToData';
import { DBArticle } from '../../type/data/DBArticle';
import { AnnounceData } from '../../type/data/AnnounceData';

export async function getAnnouncementFromFirebase(AnnouncementId: string) {
  const firebaseApp = initializeApp(firebaseConfig);
  const db = getFirestore(firebaseApp);
  const Announcements = collection(db, 'Announcements').withConverter(getConverter<AnnounceData>());
  const AnnouncementRef = doc(Announcements, AnnouncementId);
  const AnnouncementSnapshot = await getDoc(AnnouncementRef);
  if (AnnouncementSnapshot.exists() && Announcements.converter) {
    return Announcements.converter.fromFirestore(AnnouncementSnapshot);
  }
  throw new Error('failed to get Announcement from db');
}

/**
 *
 * @param options options for retrieving Announcements
 * @returns AnnouncementDataArray
 */
export async function getBulkAnnouncementFromFirebase({
  number = 15,
  page = 0,
}: {
  number?: number;
  page?: number;
}) {
  try {
    const db = getDB();
    const Announcements = collection(db, 'Announcements').withConverter(
      getConverter<AnnounceData>()
    );
    const AnnouncementLength: number = (await getDoc(doc(Announcements, 'counterRefs'))).data()
      .totalCount as number;
    let q = query(Announcements, orderBy('date'), limit(number));
    let AnnouncementsSnapshot = await getDocs(q);
    while (page !== 0) {
      q = query(
        Announcements,
        orderBy('date'),
        startAfter(AnnouncementsSnapshot.docs[AnnouncementsSnapshot.size - 1]),
        limit(number)
      );
      // eslint-disable-next-line no-await-in-loop
      AnnouncementsSnapshot = await getDocs(q);
      // eslint-disable-next-line no-param-reassign
      page--;
    }
    const returner = [];
    for (let i = 0; i < AnnouncementsSnapshot.size; i++) {
      returner.push(AnnouncementsSnapshot.docs[i].data());
    }
    return returner;
  } catch (e) {
    throw new Error('failed to get Announcement from db');
  }
}
