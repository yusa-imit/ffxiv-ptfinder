import { createStyles } from '@mantine/core';

export const PhaseStyles = createStyles((theme) => ({
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
  groupAsStack: {
    display: 'flex',
    width: '100%',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  responsiveGroup: {
    display: 'flex',
    flexDirection: 'row',
    [theme.fn.smallerThan('sm')]: {
      flexDirection: 'column',
      alignItems: 'flex-start',
      gap: 5,
    },
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
