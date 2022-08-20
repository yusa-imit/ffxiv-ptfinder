import { ClientSafeProvider } from 'next-auth/react/types';
import { getUser } from './getUser';
import '../extendedType/ExtendedAdapterUser';

export async function verifySameUser(
  email: string | null | undefined,
  provider: string
): Promise<boolean> {
  const userWithSameEmail = await getUser(email);
  // eslint-disable-next-line no-restricted-syntax
  for (const user of userWithSameEmail) {
    if (user.email === email && user.provier === provider) return false;
  }
  return true;
}
