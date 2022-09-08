import { Paper, PaperProps } from '@mantine/core';
import { ContentWrapperStyle } from './ContentWrapper.style';

export default function ContentWrapper({ children, ...etc }: PaperProps) {
  const { classes } = ContentWrapperStyle();
  return (
    <Paper shadow="md" withBorder {...etc} className={classes.main}>
      {children}
    </Paper>
  );
}
