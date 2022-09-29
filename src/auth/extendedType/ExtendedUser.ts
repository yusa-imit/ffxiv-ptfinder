import { ClientSafeProvider } from 'next-auth/react/types';
import { User } from 'next-auth';

export interface ExtendedUser extends User {
  provider: string;
  characters: string[];
  role: 'user' | 'admin';
  [key: string]: any;
}
