import { createStyles } from '@mantine/core';

export const MainSectionStyle = createStyles((theme) => ({
  wrapper: {
    width: '100%',
    height: 'fit-content',
  },
  title: {
    cursor: 'default',
  },
  main: {
    width: '100%',
    height: 'fit-content',
  },
  divider: {
    marginBottom: theme.spacing.md,
  },
}));
