import { Session } from 'next-auth';

declare module 'next-auth' {
  export interface Session {
    id: string;
  }
}
