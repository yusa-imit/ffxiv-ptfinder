import { ClientSafeProvider } from 'next-auth/react/types';

declare module 'next-auth' {
  export interface User {
    provider: string;
    characters: string[];
    role: 'user' | 'admin';
  }
}
