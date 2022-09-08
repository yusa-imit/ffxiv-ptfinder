import { Box, BoxProps, Divider, Title } from '@mantine/core';
import { MainSectionStyle } from './MainSection.style';

interface MainSectionProps extends BoxProps {
  title: string;
}

export default function MainSection({ title, children, ...etc }: MainSectionProps) {
  const { classes } = MainSectionStyle();
  return (
    <section className={classes.wrapper}>
      <Title order={6} className={classes.title}>
        {title}
      </Title>
      <Divider className={classes.divider} />
      <Box className={classes.main} {...etc}>
        {children}
      </Box>
    </section>
  );
}
