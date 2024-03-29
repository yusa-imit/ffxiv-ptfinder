import { createStyles } from '@mantine/core';
import { HEADER_HEIGHT } from '../../../constant/StyelValues';

const AppHeaderStyles = createStyles((theme) => ({
  inner: {
    height: 60,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 5,
  },
  down: {
    height: 35,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    [theme.fn.smallerThan('sm')]: {
      display: 'none',
    },
  },
  tabs: {
    [theme.fn.smallerThan('sm')]: {
      display: 'none',
    },
  },
  tabsList: {
    borderBottom: '0 !important',
  },
  tab: {
    fontWeight: 500,
    height: 35,
  },
  links: {
    [theme.fn.smallerThan('xs')]: {
      display: 'none',
    },
  },

  burger: {
    [theme.fn.largerThan('sm')]: {
      display: 'none',
    },
  },
  primary: {
    [theme.fn.smallerThan('sm')]: {
      display: 'none',
    },
  },
  theme: {
    [theme.fn.smallerThan('sm')]: {
      display: 'none',
    },
  },
  button: {
    [theme.fn.smallerThan('sm')]: {
      display: 'none',
    },
  },
  link: {
    display: 'block',
    lineHeight: 1,
    padding: '8px 12px',
    borderRadius: theme.radius.sm,
    textDecoration: 'none',
    color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.colors.gray[7],
    fontSize: theme.fontSizes.sm,
    fontWeight: 500,

    '&:hover': {
      backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
    },
  },

  linkActive: {
    '&, &:hover': {
      backgroundColor:
        theme.colorScheme === 'dark'
          ? theme.fn.rgba(theme.colors[theme.primaryColor][9], 0.25)
          : theme.colors[theme.primaryColor][0],
      color: theme.colors[theme.primaryColor][theme.colorScheme === 'dark' ? 3 : 7],
    },
  },
  nav_title_container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  nav_primary: {},
  nav_theme: {},
}));
export default AppHeaderStyles;
