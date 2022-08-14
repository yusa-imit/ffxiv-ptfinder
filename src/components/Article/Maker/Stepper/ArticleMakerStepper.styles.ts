import { createStyles } from '@mantine/core';

export const ArticleMakerStepperStyles = createStyles((theme) => ({
  inner: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    minHeight: '100vh',
    [theme.fn.smallerThan('sm')]: {
      justifyContent: 'space-between',
    },
  },
  scrollBase: {
    height: '100vh',
    width: '100vw',
    [theme.fn.largerThan('sm')]: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    },
  },
  viewPort: {
    height: '100vh',
    width: '100vw',
  },
  stepper: {
    marginTop: theme.spacing.xl,
    marginBottom: theme.spacing.md,
    [theme.fn.smallerThan('sm')]: {
      marginTop: theme.spacing.md,
    },
  },
  bottomButton: {
    marginTop: theme.spacing.md,
    marginBottom: theme.spacing.xl,
    display: 'flex',
    flexDirection: 'column',
    [theme.fn.smallerThan('sm')]: {
      marginBottom: theme.spacing.md,
    },
  },
}));
