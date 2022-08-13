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
    [theme.fn.smallerThan('sm')]: {
      gap: theme.spacing.sm,
    },
  },
  title: {
    width: '100%',
  },
  toLeft: {
    width: '100%',
    display: 'flex',
    justifyContent: 'flex-start',
    flexDirection: 'row',
  },
  gameLabelToLeft: {
    width: '100%',
    display: 'flex',
    justifyContent: 'flex-start',
  },
  divider: {
    width: '100%',
  },
}));
