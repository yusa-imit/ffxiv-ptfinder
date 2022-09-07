import {
  Button,
  Group,
  Header,
  Title,
  Text,
  useMantineTheme,
  Center,
  Divider,
  Stack,
  Tabs,
  Box,
} from '@mantine/core';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import { HEADER_HEIGHT } from '@constant/StyelValues';

import useBreakPoints from '@lib/useBreakPoints';
import { DEV_HEADER_DATA } from '@constant/DEV/DEV_HEADER_DATA';
import { allyButtonizer } from '@lib/allyButtonizer';
import { Nav } from '@recoil/Nav';
import { HeaderLinks } from '@type/HeaderLinks';
import { signIn, useSession } from 'next-auth/react';
import { useTranslation } from 'next-i18next';
import LanguageSelector from '@components/LanguageSelector';
import UserButton from '@components/UserButton';
import { User } from 'tabler-icons-react';
import NavLanguageSelector from '@components/LanguageSelector/NavLanguageSelector';
import { useRouter } from 'next/router';
import { SimpleToggleColorSheme } from './ToggleColorScheme/SimpleToggleColorSheme';
import AppHeaderStyles from './AppHeader.styles';
import { HeaderDrawer } from './HeaderDrawer/HeaderDrawer';
import PrimaryColorPicker from './PrimaryColorPicker/PrimaryColorPicker';
import Navigator from './HeaderDrawer/Navigator';
import NavToggleColorScheme from './ToggleColorScheme/NavToggleColorScheme';
import NavPrimaryColorPicker from './PrimaryColorPicker/NavPrimaryColorPicker';
import BigContainer from '../BigContainer';
import UserIconWithMenu from './UserIconWithMenu';

interface AppHeaderProps {
  Logo: React.ReactNode;
  LogoForNav?: React.ReactNode;
  title: string;
  height?: number;
  buttonText?: string;
  links?: HeaderLinks;
}
export default function AppHeader({
  Logo,
  LogoForNav,
  links = DEV_HEADER_DATA,
  title,
  height,
  buttonText,
}: AppHeaderProps): JSX.Element {
  const theme = useMantineTheme();
  const { classes, cx } = AppHeaderStyles();
  const [openNav, setOpen] = useRecoilState(Nav);
  const breakPoint = useBreakPoints();
  const isSmall = breakPoint === 'xs' || breakPoint === 'sm';
  const [current, setCurrent] = useState(links[0].label);
  const { t } = useTranslation('common');
  const { data: session } = useSession();
  const router = useRouter();
  const linkItems = links.map((link) => {
    if (!link.link) {
      throw new Error('Nested link must have link property.');
    }
    return (
      <Link href={link.link} passHref key={link.label}>
        <a
          className={cx(classes.link, { [classes.linkActive]: current === link.label })}
          {...allyButtonizer((e) => {
            setCurrent(link.label);
          })}
        >
          {link.label}
        </a>
      </Link>
    );
  });
  const tabs = ['home', 'article', 'support', 'account', 'settings'];
  const tabsItems = tabs.map((v) => (
    <Tabs.Tab value={v} key={v}>
      {t(`nav_tab_${v}`)}
    </Tabs.Tab>
  ));
  useEffect(() => {
    console.log(session);
  }, [session]);
  console.log(router.pathname);
  return (
    <Header height={isSmall ? 60 : 100} mb={120}>
      <BigContainer className={classes.inner}>
        <Group noWrap spacing="xs">
          <HeaderDrawer
            open={openNav}
            setOpen={setOpen}
            burgerProps={{ size: 'sm', className: classes.burger }}
            drawerProps={{
              size: 'lg',
              overlayColor:
                theme.colorScheme === 'dark' ? theme.colors.dark[9] : theme.colors.gray[2],
              overlayOpacity: 0.55,
              overlayBlur: 3,
              padding: 'sm',
            }}
            title={
              <Center mb="xl">
                <Group align="center" position="center">
                  {LogoForNav || Logo}
                  <Title order={1} align="center">
                    {title}
                  </Title>
                </Group>
              </Center>
            }
          >
            <>
              <Divider my="md" />
              <Center>
                {session ? (
                  <Box
                    sx={(_theme) => ({
                      width: '100%',
                      paddingRight: _theme.spacing.lg,
                      paddingLeft: _theme.spacing.lg,
                    })}
                  >
                    <UserIconWithMenu
                      image={session.user.image as string}
                      name={session.user.name as string}
                    />
                  </Box>
                ) : (
                  <Button
                    className={classes.button}
                    size={isSmall ? 'xs' : 'sm'}
                    onClick={() => {
                      signIn();
                    }}
                  >
                    {
                      // TODO
                      //buttonText
                      //
                      t('nav_login_button')
                    }
                  </Button>
                )}
              </Center>
              <Divider my="md" />
              <Navigator links={DEV_HEADER_DATA} />
              <Divider my="md" />
              <Stack spacing={0}>
                <NavToggleColorScheme />
                <NavPrimaryColorPicker />
                <NavLanguageSelector title={t('nav_lang')} />
              </Stack>
            </>
          </HeaderDrawer>
          {Logo}
          <Title order={1}>{title}</Title>
        </Group>
        <Group
          spacing="xs"
          noWrap
          sx={(_theme) => ({
            [_theme.fn.smallerThan('sm')]: {
              display: 'none',
            },
          })}
        >
          <PrimaryColorPicker className={classes.primary} />
          <SimpleToggleColorSheme className={classes.theme} />
          <LanguageSelector title={t('nav_lang')} />
          {session ? (
            <UserIconWithMenu
              image={session.user.image as string}
              name={session.user.name as string}
            />
          ) : (
            <Button
              className={classes.button}
              size={isSmall ? 'xs' : 'sm'}
              onClick={() => {
                signIn();
              }}
            >
              {
                // TODO
                //buttonText
                //
                t('nav_login_button')
              }
            </Button>
          )}
        </Group>
      </BigContainer>
      <BigContainer className={classes.down}>
        <Tabs
          classNames={{ root: classes.tabs, tabsList: classes.tabsList, tab: classes.tab }}
          value={router.pathname.split('/')[0] === '' ? 'home' : router.pathname.split('/')[0]}
        >
          <Tabs.List>{tabsItems}</Tabs.List>
        </Tabs>
      </BigContainer>
    </Header>
  );
}
