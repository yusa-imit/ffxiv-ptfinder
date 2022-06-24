import { MantineProvider, ColorScheme, ColorSchemeProvider } from '@mantine/core';
import { NotificationsProvider } from '@mantine/notifications';
import { setCookies } from 'cookies-next';
import { NextComponentType, NextPageContext } from 'next';
import { AppProps } from 'next/app';
import { useState } from 'react';
import { useRecoilValue } from 'recoil';
import { Primary } from '../../../recoil/Primary/Primary';

export function GlobalApp(props: AppProps & { colorScheme: ColorScheme }) {
  const { Component, pageProps } = props;
  const app_primary = useRecoilValue(Primary);
  const [colorScheme, setColorScheme] = useState<ColorScheme>(props.colorScheme);
  const toggleColorScheme = (value?: ColorScheme) => {
    const nextColorScheme = value || (colorScheme === 'dark' ? 'light' : 'dark');
    setColorScheme(nextColorScheme);
    setCookies('mantine-color-scheme', nextColorScheme, { maxAge: 60 * 60 * 24 * 30 });
  };
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
