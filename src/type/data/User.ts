type Verifiable = 'credential' | 'email' | 'google' | 'twitter' | 'facebook';

export interface User {
  name: string;
  id: string;
  verify: Verifiable;
  characters: Array<number>;
}
