/* eslint-disable no-param-reassign */
import '@extType/ExtendedUser';
import { getClient } from '@lib/db/mongodb/singleton';
import { MongoDBAdapter } from '@next-auth/mongodb-adapter';
import NextAuth, { NextAuthOptions } from 'next-auth';
import DiscordProvider from 'next-auth/providers/discord';
import GoogleProvider from 'next-auth/providers/google';
import KakaoProvider from 'next-auth/providers/kakao';
import LineProvider from 'next-auth/providers/line';
import NaverProvider from 'next-auth/providers/naver';
import TwitterProvider from 'next-auth/providers/twitter';
import { dbRoute } from '../../../src/lib/db/dbRoute';
import { authenv } from './authenv';

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: authenv.GOOGLE.ID,
      clientSecret: authenv.GOOGLE.PW,
      profile(profile) {
        return {
          id: profile.sub,
          name: profile.name,
          email: profile.email,
          image: profile.picture,
          provider: 'google',
          characters: [],
          role: 'user',
        };
      },
    }),
    DiscordProvider({
      clientId: authenv.DISCORD.ID,
      clientSecret: authenv.DISCORD.PW,
      profile(profile) {
        if (profile.avatar === null) {
          // eslint-disable-next-line radix
          const defaultAvatarNumber = parseInt(profile.discriminator) % 5;
          profile.image_url = `https://cdn.discordapp.com/embed/avatars/${defaultAvatarNumber}.png`;
        } else {
          const format = profile.avatar.startsWith('a_') ? 'gif' : 'png';
          profile.image_url = `https://cdn.discordapp.com/avatars/${profile.id}/${profile.avatar}.${format}`;
        }
        return {
          id: profile.id,
          name: profile.username,
          email: profile.email,
          image: profile.image_url,
          provider: 'discord',
          characters: [],
          role: 'user',
        };
      },
    }),
    KakaoProvider({
      clientId: authenv.KAKAO.ID,
      clientSecret: authenv.KAKAO.PW,
      profile(profile) {
        return {
          id: String(profile.id),
          name: profile.kakao_account?.profile?.nickname,
          email: profile.kakao_account?.email,
          image: profile.kakao_account?.profile?.profile_image_url,
          provider: 'kakao',
          characters: [],
          role: 'user',
        };
      },
    }),
    LineProvider({
      clientId: authenv.LINE.ID,
      clientSecret: authenv.LINE.PW,
      profile(profile) {
        return {
          id: profile.sub,
          name: profile.name,
          email: profile.email,
          image: profile.picture,
          provider: 'line',
          characters: [],
          role: 'user',
        };
      },
    }),
    NaverProvider({
      clientId: authenv.NAVER.ID,
      clientSecret: authenv.NAVER.PW,
      profile(profile) {
        return {
          id: profile.response.id,
          name: profile.response.name,
          email: profile.response.email,
          image: profile.response.profile_image,
          provider: 'naver',
          characters: [],
          role: 'user',
        };
      },
    }),
    TwitterProvider({
      clientId: authenv.TWITTER.ID,
      clientSecret: authenv.TWITTER.PW,
      profile(profile) {
        return {
          id: profile.id_str,
          name: profile.name,
          email: profile.email,
          image: profile.profile_image_url_https.replace(/_normal\.(jpg|png|gif)$/, '.$1'),
          provider: 'twitter',
          characters: [],
          role: 'user',
        };
      },
      /**
       * for 2.0
      clientId: 'ZG5WWlFfS1UzWVV4SERsVWZhWXE6MTpjaQ',
      clientSecret: '5Z09E0tgiMGQ0NWkfhEoxO778YOzF4ATi-nU6zLYyKYyeW5oUQ',
       
      profile({ data }) {
        return {
          id: data.id,
          name: data.name,
          // NOTE: E-mail is currently unsupported by OAuth 2 Twitter.
          email: data.Email,
          image: data.profile_image_url,
          provider: 'twitter',
          characters: [],
          role: 'user',
        };
      },*/
      //clientId: 'gd6IG8ItIzrIc1VsAiUyWoldC',
      //clientSecret: 'wdbX0x4tftdMEjq2c1O4sOJ8jVaLZVLliH0elHxpeLS9zdPmyg',
      // bearer token : AAAAAAAAAAAAAAAAAAAAADCpgAEAAAAArxa1s5FdSu8x978HoNupqWk518M%3D8IAc0HAPWeoe0oZt8U2WTnDEfeaBTVx8b9ncPrSNYxJGSVSuPR
    }),
  ],
  adapter: MongoDBAdapter(getClient(dbRoute('')[0]), {
    databaseName: dbRoute('')[1],
  }),
  session: {
    strategy: 'database',
    maxAge: 30 * 24 * 60 * 60,
    updateAge: 24 * 60 * 60,
  },
  pages: {
    signIn: '/auth/signin',
    signOut: '/auth/signout',
    error: '/auth/error', // Error code passed in query string as ?error=
    verifyRequest: '/auth/verify-request', // (used for check email message)
    //newUser: '/auth/new-user', // New users will be directed here on first sign in (leave the property out if not of interest)
  },
  callbacks: {
    async redirect({ url, baseUrl }) {
      // Allows relative callback URLs
      if (url.startsWith('/')) return `${baseUrl}${url}`;
      // Allows callback URLs on the same origin
      if (new URL(url).origin === baseUrl) return url;
      return baseUrl;
    },
    /**
    async session({ session, user, token }) {
      session.role = user.role;
      return session;
    },*/
  },
  /**
  callbacks: {
    async signIn({
      user,
      account,
      profile,
    }: {
      user: User;
      account: Account;
      profile: Profile & Record<string, unknown>;
      email: {
        verificationRequest?: boolean | undefined;
      };
      credentials?: Record<string, CredentialInput> | undefined;
    }) {
      user.name = 'this name is changed';
      return verifySameUser(user.email, user.provider);
    },
    
  }, */
};
export default NextAuth(authOptions);
