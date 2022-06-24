import { Burger, Button, Container, Group, Header, Title } from '@mantine/core';
import { HEADER_HEIGHT } from '../../../constant/StyelValues';
import useNav from '../../../recoil/Nav/useNav';
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
        <Group>
          <Button>{buttonText}</Button>
        </Group>
      </Container>
    </Header>
  );
}
