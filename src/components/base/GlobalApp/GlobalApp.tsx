import { MantineProvider, ColorScheme, ColorSchemeProvider } from '@mantine/core';
import { ModalsProvider } from '@mantine/modals';
import { NotificationsProvider } from '@mantine/notifications';
import { Primary } from '@recoil/Primary';
import { useSSRCompletedState } from '@recoil/SSR/SSRCompleted';
import { setCookies } from 'cookies-next';
import { AppProps } from 'next/app';
import { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { SessionProvider } from 'next-auth/react';
import { NavigationProgress } from '@mantine/nprogress';
import DEV_TOP_ICON from '@components/icons/DEV_TOP_ICON';
import { DEV_FOOTER_DATA } from '@constant/DEV/DEV_FOOTER_DATA';
import { useRouter } from 'next/router';
import { SWRConfig } from 'swr';
import { swrFetcher } from '@lib/swrFetcher';
import Viewport from './Viewport';
import { RouterTransition } from '../RouterTransition/RouterTransition';
import AppHeader from '../AppHeader/AppHeader';
import AppFooter from '../AppFooter/AppFooter';
import { renderHeader } from '../../../lib/renderHeader';
import BigContainer from '../BigContainer';

export function GlobalApp(props: AppProps & { colorScheme: ColorScheme; primary: string }) {
  const { Component, pageProps } = props;
  const app_primary = useRecoilValue(Primary);
  const [colorScheme, setColorScheme] = useState<ColorScheme>(props.colorScheme);
  const toggleColorScheme = (value?: ColorScheme) => {
    const nextColorScheme = value || (colorScheme === 'dark' ? 'light' : 'dark');
    setColorScheme(nextColorScheme);
    setCookies('mantine-color-scheme', nextColorScheme, { maxAge: 60 * 60 * 24 * 30 });
  };
  const [temp_primary, set_temp_primary] = useState(props.primary);
  const router = useRouter();
  const setSSRCompleted = useSSRCompletedState();
  useEffect(setSSRCompleted, [setSSRCompleted]);
  return (
    <div dir="ltr">
      <SWRConfig value={{ fetcher: swrFetcher }}>
        <ColorSchemeProvider colorScheme={colorScheme} toggleColorScheme={toggleColorScheme}>
          <MantineProvider
            theme={{ primaryColor: app_primary, colorScheme }}
            withGlobalStyles
            withNormalizeCSS
          >
            <NotificationsProvider>
              <ModalsProvider>
                <SessionProvider session={pageProps.session}>
                  <Viewport>
                    <RouterTransition />
                    {renderHeader(router) === 'block' ? (
                      <>
                        <AppHeader
                          Logo={<DEV_TOP_ICON />}
                          LogoForNav={<DEV_TOP_ICON size="xl" />}
                          title="DEV_APP_TITLE"
                          buttonText="DEV_BUTTON_TEXT"
                          display={renderHeader(router)}
                        />

                        <BigContainer>
                          <Component {...pageProps} />
                        </BigContainer>

                        <AppFooter
                          Logo={<DEV_TOP_ICON />}
                          title="DEV_APP_TITLE"
                          links={DEV_FOOTER_DATA}
                          display={renderHeader(router)}
                        />
                      </>
                    ) : (
                      <Component {...pageProps} />
                    )}
                  </Viewport>
                </SessionProvider>
              </ModalsProvider>
            </NotificationsProvider>
          </MantineProvider>
        </ColorSchemeProvider>
      </SWRConfig>
    </div>
  );
}
