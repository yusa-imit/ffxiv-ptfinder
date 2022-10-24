import { getConverter } from '@lib/firebaseConverter';
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
import { User } from '@type/data/User';
import { GlobalCache } from '../cache/GlobalCache';
import { getDB } from '../db/getDB';

export async function getUserFromFirebase(userId: string) {
  const cachedValue = GlobalCache.getCache().get(GlobalCache.getKey(userId, 'user')) as User | null;
  if (cachedValue !== null) {
    return cachedValue;
  }
  const db = getDB();
  const UserCollection = collection(db, 'users').withConverter(getConverter<User>());
  const userSnapshot = await getDoc(doc(UserCollection, userId));
  if (!userSnapshot.exists()) throw new Error('User not exists');
  const UserData = userSnapshot.data();
  GlobalCache.getCache().put(
    GlobalCache.getKey(userId, 'user'),
    UserData,
    GlobalCache.CACHE_TIMEOUT_MS
  );
  return UserData;
}
export async function getBulkUserFromFirebase(userIdArray: string[]) {
  const returner: Record<string, User> = {};
  const promises = userIdArray.map((v) => getUserFromFirebase(v));
  const values = await Promise.all(promises);
  for (let i = 0; i < userIdArray.length; i++) {
    returner[userIdArray[i]] = values[i];
  }
  return returner;
}
