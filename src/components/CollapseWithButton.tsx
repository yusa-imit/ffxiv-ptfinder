import { Collapse, CollapseProps, createStyles, UnstyledButton } from '@mantine/core';
import { ReactNode, useState } from 'react';

const useStyles = createStyles((theme) => ({
  button: {
    width: '100%',
    display: 'block',
    padding: theme.spacing.sm,
    textAlign: 'center',
    borderRadius: 8,
    fontSize: theme.fontSizes.sm,
    fontWeight: 650,
    color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.black,
    '&:hover': {
      backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[0],
    },
  },
  inner: {},
}));

interface CollapseWithButtonProps {
  defaultState: boolean;
  textOpen: string;
  textClose: string;
  children: ReactNode;
}

export function CollapseWithButton({
  defaultState,
  textOpen,
  textClose,
  children,
}: CollapseWithButtonProps) {
  const [open, setOpen] = useState(defaultState);
  const { classes } = useStyles();
  return (
    <>
      <UnstyledButton
        className={classes.button}
        onClick={() => {
          setOpen((p) => !p);
        }}
      >
        {open ? textClose : textOpen}
      </UnstyledButton>
      <Collapse in={open} className={classes.inner}>
        {children}
      </Collapse>
    </>
  );
}
