import { Session } from 'next-auth';

declare module 'next-auth' {
  interface Session {
    id: string;
    user: {
      provider: string;
      image?: string;
      emailVerified?: string | null;
      characters: Array<string>;
      name: string;
      email: string;
      role: 'admin' | 'user';
      id: string;
    };
    expires: string;
    role: 'admin' | 'user';
  }
}
