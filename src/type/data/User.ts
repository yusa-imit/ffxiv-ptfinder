type Verifiable = 'credential' | 'email' | 'google' | 'twitter' | 'line' | 'naver' | 'kakao';

export interface User {
  name: string;
  id: string;
  verify: Verifiable;
  characters: Array<number>;
}
