import { createStyles } from '@mantine/core';

export const Phase1Styles = createStyles((theme) => ({
  inner: {
    paddingTop: theme.spacing.md,
    paddingBottom: theme.spacing.md,
    width: '100%',
    minHeight: '60vh',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  title: {
    width: '100%',
  },
}));
