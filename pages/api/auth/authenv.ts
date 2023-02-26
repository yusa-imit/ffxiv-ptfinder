type Providers = 'GOOGLE' | 'DISCORD' | 'KAKAO' | 'LINE' | 'NAVER' | 'TWITTER';

export const authenv: Record<Providers, { ID: string; PW: string }> = {
  GOOGLE: {
    ID: process.env.AUTH_GOOGLE_ID as string,
    PW: process.env.AUTH_GOOGLE_PW as string,
  },
  DISCORD: {
    ID: process.env.AUTH_DISCORD_ID as string,
    PW: process.env.AUTH_DISCORD_PW as string,
  },
  KAKAO: {
    ID: process.env.AUTH_KAKAO_ID as string,
    PW: process.env.AUTH_KAKAO_PW as string,
  },
  LINE: { ID: process.env.AUTH_LINE_ID as string, PW: process.env.AUTH_LINE_PW as string },
  NAVER: { ID: process.env.AUTH_NAVER_ID as string, PW: process.env.AUTH_NAVER_PW as string },
  TWITTER: { ID: process.env.AUTH_TWITTER_ID as string, PW: process.env.AUTH_TWITTER_PW as string },
};
