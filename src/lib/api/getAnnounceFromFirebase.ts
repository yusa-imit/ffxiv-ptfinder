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
  updateDoc,
} from 'firebase/firestore';
import { firebaseConfig } from '@pages/api/auth/api_config';
import { getConverter } from '@lib/firebaseConverter';
import { AdapterUser } from 'next-auth/adapters';
import { getDB } from '@lib/db/getDB';
import { ArticleData } from '../../type/data/ArticleData';
import { articleConverToData } from '../transform/articleConvertToData';
import { DBArticle } from '../../type/data/DBArticle';
import { AnnounceData, AnnounceSummary } from '../../type/data/AnnounceData';
import { summarizeAnnounce } from '../transform/summarizeAnnounce';

export async function getAnnouncementFromFirebase(AnnouncementId: string) {
  const db = getDB();
  const Announcements = collection(db, 'Announcements').withConverter(getConverter<AnnounceData>());
  const AnnouncementRef = doc(Announcements, AnnouncementId);
  const AnnouncementSnapshot = await getDoc(AnnouncementRef);
  if (AnnouncementSnapshot.exists() && Announcements.converter) {
    return Announcements.converter.fromFirestore(AnnouncementSnapshot);
  }
  throw new Error('failed to get Announcement from db');
}

export async function getAnnouncementSummaryFromFirebase(AnnouncementId: string) {
  const data = await getAnnouncementFromFirebase(AnnouncementId);
  return summarizeAnnounce(data);
}

/**
 *
 * @param options options for retrieving Announcements
 * @returns AnnouncementDataArray
 */
export async function getBulkAnnouncementSummaryFromFirebase({
  page = 0,
  number = 15,
}: {
  number?: number;
  page?: number;
}) {
  const db = getDB();
  const Announcements = collection(db, 'Announcements').withConverter(getConverter<AnnounceData>());
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
  const returner: Record<string, AnnounceSummary> = {};
  const promises = AnnouncementsSnapshot.docs.map((v) => getAnnouncementSummaryFromFirebase(v.id));
  const values = await Promise.all(promises);
  for (let i = 0; i < promises.length; i++) {
    returner[AnnouncementsSnapshot.docs[i].id] = values[i];
  }
  return returner;
}
