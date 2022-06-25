import { Title, Text, Button, Space, Center } from '@mantine/core';
import Link from 'next/link';
import useStyles from './Welcome.styles';

export function Welcome() {
  const { classes } = useStyles();

  return (
    <>
      <Title className={classes.title} align="center" mt={100}>
        Welcome!{'\n'}
      </Title>
      <Title className={classes.title} align="center" mb={100}>
        <Text inherit variant="gradient" component="span">
          Kozue is Currently on Development{'\n'}
        </Text>
      </Title>
      <Center>
        <Link href="/dev" passHref>
          <Button component="a">Go to Current Dev</Button>
        </Link>
      </Center>
    </>
  );
}
