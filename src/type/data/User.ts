type Verifiable = 'credential' | 'email' | 'google' | 'twitter' | 'line' | 'naver' | 'kakao';

export type User = {
  name: string;
  id: string;
  role: 'user' | 'admin';
  image?: string;
  verify: Verifiable;
  characters: Array<number>;
};

export interface UserSummary {
  name: string;
  image?: string;
}
