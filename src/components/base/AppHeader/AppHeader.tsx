import { Burger, Button, Container, Group, Header, Title } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import { HEADER_HEIGHT } from '../../../constant/StyelValues';
import useBreakPoints from '../../../lib/useBreakPoints';
import useNav from '../../../recoil/Nav/useNav';
import PrimaryColorPicker from '../PrimaryColorPicker/PrimaryColorPicker';
import { SimpleToggleColorSheme } from '../ToggleColorScheme/SimpleToggleColorSheme';
import AppHeaderStyles from './AppHeader.styles';

interface AppHeaderProps {
  Logo: React.ReactNode;
  title: string;
  height?: number;
  buttonText?: string;
}
export default function AppHeader({
  Logo,
  title,
  height,
  buttonText,
}: AppHeaderProps): JSX.Element {
  const { classes } = AppHeaderStyles();
  const [openNav, toggleNav] = useNav();
  const breakPoint = useBreakPoints();
  const isSmall = breakPoint === 'xs' || breakPoint === 'sm';
  return (
    <Header height={height || HEADER_HEIGHT} mb={120}>
      <Container className={classes.inner} fluid>
        <Group noWrap spacing="xs">
          <Burger
            opened={openNav}
            onClick={() => {
              toggleNav();
            }}
            size="sm"
            //className={classes.burger}
          />
          {!isSmall && Logo}
          <Title order={isSmall ? 4 : 1}>{title}</Title>
        </Group>
        <Group />
        <Group spacing="xs">
          <PrimaryColorPicker className={classes.primary} />
          <SimpleToggleColorSheme className={classes.theme} />
          <Button size={isSmall ? 'xs' : 'sm'}>{buttonText}</Button>
        </Group>
      </Container>
    </Header>
  );
}
