import { createStyles } from '@mantine/core';

export const MainSectionStyle = createStyles((theme) => ({
  wrapper: {
    width: '100%',
    height: 'fit-content',
  },
  titleGroup: {
    width: '100%',
  },
  title: {
    cursor: 'default',
  },
  seeMore: {
    marginLeft: 'auto',
  },
  main: {
    width: '100%',
    height: 'fit-content',
  },
  divider: {
    marginBottom: theme.spacing.md,
  },
}));
