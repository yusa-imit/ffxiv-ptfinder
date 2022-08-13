import { createStyles } from '@mantine/core';

export const ArticleMakerStepperStyles = createStyles((theme) => ({
  inner: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    height: 'fit-content',
    marginTop: 20,
    [theme.fn.smallerThan('sm')]: {
      justifyContent: 'space-between',
    },
  },
  viewPort: {
    height: '100vh',
    width: '100wh',
    [theme.fn.largerThan('sm')]: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    },
  },
  stepper: {
    marginBottom: theme.spacing.md,
    [theme.fn.smallerThan('sm')]: {
      marginTop: theme.spacing.md,
    },
  },
  bottomButton: {
    marginTop: theme.spacing.md,
    [theme.fn.smallerThan('sm')]: {
      marginBottom: theme.spacing.md,
    },
  },
}));
