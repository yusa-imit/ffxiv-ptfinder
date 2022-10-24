type Verifiable = 'credential' | 'email' | 'google' | 'twitter' | 'line' | 'naver' | 'kakao';

export type User = {
  name: string;
  id: string;
  image?: string;
  verify: Verifiable;
  characters: Array<number>;
};

export interface UserSummary {
  name: string;
  image?: string;
  characters: Array<string>;
}
