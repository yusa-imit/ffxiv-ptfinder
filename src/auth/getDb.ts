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
} from 'firebase/firestore';
import { firebaseConfig } from '@pages/api/auth/api_config';
import { initializeApp } from 'firebase/app';
import { AdapterSession, AdapterUser, VerificationToken } from 'next-auth/adapters';
import { Account } from 'next-auth';
import { getConverter } from './util/getConverter';

type IndexableObject = Record<string, unknown>;

const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp);

const Users = collection(db, 'users').withConverter(getConverter<AdapterUser>());
const Sessions = collection(db, 'sessions').withConverter(
  getConverter<AdapterSession & IndexableObject>()
);
const Accounts = collection(db, 'accounts').withConverter(getConverter<Account>());
const VerificationTokens = collection(db, 'verificationTokens').withConverter(
  getConverter<VerificationToken & IndexableObject>({ excludeId: true })
);

export { Users, Sessions, Accounts, VerificationTokens };
