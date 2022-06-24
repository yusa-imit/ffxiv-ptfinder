import { Burger, Button, Container, Group, Header, Title } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import { HEADER_HEIGHT } from '../../../constant/StyelValues';
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
  return (
    <Header height={height || HEADER_HEIGHT} mb={120}>
      <Container className={classes.inner} fluid>
        <Group>
          <Burger
            opened={openNav}
            onClick={() => {
              toggleNav();
            }}
            size="sm"
          />
          {Logo}
          <Title>{title}</Title>
        </Group>
        <Group />
        <Group spacing="xs">
          <PrimaryColorPicker />
          <SimpleToggleColorSheme />
          <Button>{buttonText}</Button>
        </Group>
      </Container>
    </Header>
  );
}
