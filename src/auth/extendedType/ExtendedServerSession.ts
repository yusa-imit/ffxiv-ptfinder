import { Session } from '@auth/next-auth/src';
import './ExtendedUser';
import { ExtendedUser } from './ExtendedUser';

export interface ServerSession extends Session {
  user: ExtendedUser;
}
