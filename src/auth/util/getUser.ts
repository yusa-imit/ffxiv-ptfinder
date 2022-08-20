import { AdapterUser } from 'next-auth/adapters';
import { query, getDocs, where } from 'firebase/firestore';
import { Users } from '../getDb';
import '../extendedType/ExtendedAdapterUser';

export async function getUser(email: string | null | undefined) {
  if (email === null || !email) return [];
  const userQuery = query(Users, where('email', '==', email));
  const userSnapshots = await getDocs(userQuery);
  const arr: AdapterUser[] = [];
  if (!userSnapshots.empty) {
    userSnapshots.forEach((snapshot) => {
      if (Users.converter) arr.push(Users.converter.fromFirestore(snapshot));
    });
  }
  return arr;
}
