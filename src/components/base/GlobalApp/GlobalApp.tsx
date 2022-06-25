import { MantineProvider, ColorScheme, ColorSchemeProvider } from '@mantine/core';
import { NotificationsProvider } from '@mantine/notifications';
import { Primary } from '@recoil/Primary';
import { useSSRCompletedState } from '@recoil/SSR/SSRCompleted';
import { setCookies } from 'cookies-next';
import { AppProps } from 'next/app';
import { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';

export function GlobalApp(props: AppProps & { colorScheme: ColorScheme }) {
  const { Component, pageProps } = props;
  const app_primary = useRecoilValue(Primary);
  const [colorScheme, setColorScheme] = useState<ColorScheme>(props.colorScheme);
  const toggleColorScheme = (value?: ColorScheme) => {
    const nextColorScheme = value || (colorScheme === 'dark' ? 'light' : 'dark');
    setColorScheme(nextColorScheme);
    setCookies('mantine-color-scheme', nextColorScheme, { maxAge: 60 * 60 * 24 * 30 });
  };
  const setSSRCompleted = useSSRCompletedState();
  useEffect(setSSRCompleted, [setSSRCompleted]);
  return (
    <ColorSchemeProvider colorScheme={colorScheme} toggleColorScheme={toggleColorScheme}>
      <MantineProvider
        theme={{ primaryColor: app_primary, colorScheme }}
        withGlobalStyles
        withNormalizeCSS
      >
        <NotificationsProvider>
          <Component {...pageProps} />
        </NotificationsProvider>
      </MantineProvider>
    </ColorSchemeProvider>
  );
}
