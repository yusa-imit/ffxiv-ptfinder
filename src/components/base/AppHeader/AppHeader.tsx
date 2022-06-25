import {
  Burger,
  Button,
  Container,
  Group,
  Header,
  Title,
  Text,
  useMantineTheme,
  Center,
} from '@mantine/core';
import Link from 'next/link';
import React, { useState } from 'react';
import { useRecoilState } from 'recoil';
import { HEADER_HEIGHT } from '../../../constant/StyelValues';
import useBreakPoints from '../../../lib/useBreakPoints';
import { HeaderLinks } from '../../../types/HeaderLinks';
import PrimaryColorPicker from '../PrimaryColorPicker/PrimaryColorPicker';
import { SimpleToggleColorSheme } from '../ToggleColorScheme/SimpleToggleColorSheme';
import AppHeaderStyles from './AppHeader.styles';
import { DEV_HEADER_DATA } from '../../../constant/DEV/DEV_HEADER_DATA';
import { allyButtonizer } from '../../../lib/allyButtonizer';
import { HeaderDrawer } from '../HeaderDrawer/HeaderDrawer';
import { nav } from '../../../recoil/Nav/Nav';

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
  const [openNav, setOpen] = useRecoilState(nav);
  const breakPoint = useBreakPoints();
  const isSmall = breakPoint === 'xs' || breakPoint === 'sm';
  const [current, setCurrent] = useState(links[0].label);
  const linkItems = links.map((link) => (
    <Link href={link.link} passHref>
      <a
        key={link.label}
        className={cx(classes.link, { [classes.linkActive]: current === link.label })}
        {...allyButtonizer((e) => {
          setCurrent(link.label);
        })}
      >
        {link.label}
      </a>
    </Link>
  ));
  return (
    <Header height={height || HEADER_HEIGHT} mb={120}>
      <Container className={classes.inner} fluid>
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
              <Center>
                <Group align="center" position="center">
                  {LogoForNav || Logo}
                  <Title order={1} align="center">
                    {title}
                  </Title>
                </Group>
              </Center>
            }
          >
            <Group position="left" direction="column">
              <Text>DEV_DRAWER</Text>
            </Group>
          </HeaderDrawer>
          {!isSmall && Logo}
          <Title order={isSmall ? 4 : 1}>{title}</Title>
        </Group>
        <Group className={classes.links} spacing={5} noWrap>
          {linkItems}
        </Group>
        <Group spacing="xs" noWrap>
          <PrimaryColorPicker className={classes.primary} />
          <SimpleToggleColorSheme className={classes.theme} />
          <Button className={classes.button} size={isSmall ? 'xs' : 'sm'}>
            {buttonText}
          </Button>
        </Group>
      </Container>
    </Header>
  );
}
