import { Accounts } from '@auth/getDb';
import { query, getDocs, where } from 'firebase/firestore';

export async function getProvided(userId: string) {
  const accountQuery = query(Accounts, where('userId', '==', userId));
  const accountsSnapshots = await getDocs(accountQuery);
  const arr: string[] = [];
  if (!accountsSnapshots.empty) {
    accountsSnapshots.forEach((snapshot) => {
      if (Accounts.converter) arr.push(snapshot.data().provider);
    });
  }
  return arr;
}
