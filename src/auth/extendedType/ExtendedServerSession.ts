import './ExtendedUser';

declare module 'next-auth' {
  export interface Session {
    user: User;
  }
}
