import { ClientSafeProvider } from 'next-auth/react/types';
import { User } from 'next-auth';
declare module 'next-auth' {
  interface User {
    provider: string;
    image?: string;
    emailVerified?: string | null;
    characters: Array<string>;
    name: string;
    email: string;
    role: 'admin' | 'user';
    id: string;
  }
}
