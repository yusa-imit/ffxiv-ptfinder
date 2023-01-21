import { ClientSafeProvider } from 'next-auth/react/types';

declare module 'next-auth/adapters' {
  export interface AdapterUser {
    provier: string;
    characters: string[];
  }
}
