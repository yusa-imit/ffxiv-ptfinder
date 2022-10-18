import { initializeApp } from 'firebase/app';
import { Firestore, getFirestore } from 'firebase/firestore';
import { firebaseConfig } from '@pages/api/auth/api_config';

abstract class FirestoreInterface {
  static firestoreClient: Firestore | undefined = undefined;
  static getClient(): Firestore {
    if (!this.firestoreClient) {
      this.firestoreClient = getFirestore(initializeApp(firebaseConfig));
    }
    return this.firestoreClient;
  }
}
export function getDB() {
  return FirestoreInterface.getClient();
}
