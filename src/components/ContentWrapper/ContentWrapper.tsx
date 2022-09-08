import { Paper, PaperProps } from '@mantine/core';
import { ContentWrapperStyle } from './ContentWrapper.style';

interface ContentWrapperProps extends PaperProps {
  withoutBorder?: boolean;
}
export default function ContentWrapper({ withoutBorder, children, ...etc }: ContentWrapperProps) {
  const { classes } = ContentWrapperStyle();
  return (
    <Paper
      shadow="md"
      withBorder={withoutBorder ? !withoutBorder : true}
      {...etc}
      className={classes.main}
    >
      {children}
    </Paper>
  );
}
