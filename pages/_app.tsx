import { GetServerSidePropsContext } from 'next';
import { ColorScheme, MantineThemeColors } from '@mantine/core';
import { AppProps } from 'next/app';
import { getCookie } from 'cookies-next';
import Head from 'next/head';
import { RecoilRoot } from 'recoil';
import { appWithTranslation } from 'next-i18next';
import { GlobalApp } from '../src/components/base/GlobalApp/GlobalApp';
import nextI18NextConfig from '../next-i18next.config';

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

App.getInitialProps = ({ ctx }: { ctx: GetServerSidePropsContext }) => ({
  colorScheme: getCookie('mantine-color-scheme', ctx) || 'light',
});

export default appWithTranslation(App);
