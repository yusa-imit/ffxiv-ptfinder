import { getDB } from '@lib/db/getDB';
import { Locale } from '@type/Locale';
import {
  collection,
  doc,
  getDoc,
  getDocs,
  limit,
  orderBy,
  query,
  startAfter,
} from 'firebase/firestore';
import { AnnounceData, AnnounceSummary, DBAnnounceData } from '../../type/data/AnnounceData';
import { GlobalCache } from '../cache/GlobalCache';
import { summarizeAnnounce } from '../transform/summarizeAnnounce';

export async function getAnnouncementFromFirebase(
  locale: Locale,
  AnnouncementId: string
): Promise<AnnounceData> {
  const cachedValue = GlobalCache.getCache().get(
    GlobalCache.getKey(AnnouncementId, 'announce')
  ) as null | DBAnnounceData;
  if (cachedValue !== null) {
    return {
      type: cachedValue.type,
      title: cachedValue.titles[locale],
      description: cachedValue.descriptions[locale],
      date: cachedValue.date,
    };
  }

  const db = getDB();
  const Announcements = collection(db, 'announces');
  const AnnouncementRef = doc(Announcements, AnnouncementId);
  const AnnouncementSnapshot = await getDoc(AnnouncementRef);
  if (AnnouncementSnapshot.exists()) {
    const data = AnnouncementSnapshot.data();
    GlobalCache.getCache().put(
      GlobalCache.getKey(AnnouncementId, 'announce'),
      data,
      GlobalCache.CACHE_TIMEOUT_MS
    );
    return {
      type: data.type,
      title: data.titles[locale],
      description: data.descriptions[locale],
      date: data.date,
    };
  }
  throw new Error('failed to get Announcement from db');
}

export async function getAnnouncementSummaryFromFirebase(locale: Locale, AnnouncementId: string) {
  const data = await getAnnouncementFromFirebase(locale, AnnouncementId);
  return summarizeAnnounce(data);
}

/**
 *
 * @param options options for retrieving Announcements
 * @returns AnnouncementDataArray
 */
export async function getBulkAnnouncementSummaryFromFirebase(
  locale: Locale,
  page: number = 0,
  number: number = 15
) {
  const db = getDB();
  const Announcements = collection(db, 'announces');
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
  const promises = AnnouncementsSnapshot.docs.map((v) =>
    getAnnouncementSummaryFromFirebase(locale, v.id)
  );
  const values = await Promise.all(promises);
  for (let i = 0; i < promises.length; i++) {
    returner[AnnouncementsSnapshot.docs[i].id] = values[i];
  }
  return returner;
}
