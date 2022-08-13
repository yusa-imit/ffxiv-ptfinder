import { createStyles } from '@mantine/core';

export const ArticleMakerStepperStyles = createStyles((theme) => ({
  inner: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'column',
    marginTop: 20,
    [theme.fn.smallerThan('sm')]: {
      justifyContent: 'space-between',
    },
  },
  viewPort: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    width: '100wh',
  },
}));
