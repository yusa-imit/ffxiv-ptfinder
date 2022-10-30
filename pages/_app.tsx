import { GetServerSidePropsContext, GetServerSideProps } from 'next';
import { ColorScheme, MantineThemeColors } from '@mantine/core';
import { AppProps } from 'next/app';
import { getCookie } from 'cookies-next';
import Head from 'next/head';
import { RecoilRoot } from 'recoil';
import { appWithTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { GlobalApp } from '../src/components/base/GlobalApp/GlobalApp';
import nextI18NextConfig from '../next-i18next.config';
import { getServerSideProps } from './index';

function App(props: AppProps & { colorScheme: ColorScheme }) {
  return (
    <>
      <Head>
        <title>FFXIV PARTY FINDER</title>
        <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
        <link rel="shortcut icon" href="/favicon.svg" />
      </Head>
      <RecoilRoot>
        <GlobalApp {...props} />
      </RecoilRoot>
    </>
  );
}

App.getInitialProps = async ({ ctx }: { ctx: GetServerSidePropsContext }) => ({
  colorScheme: getCookie('mantine-color-scheme', ctx) || 'light',
});

export default appWithTranslation(App);
