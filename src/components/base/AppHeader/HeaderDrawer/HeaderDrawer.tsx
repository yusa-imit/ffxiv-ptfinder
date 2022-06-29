import { Burger, BurgerProps, Drawer, DrawerProps, Stack, useMantineTheme } from '@mantine/core';
import { useViewportSize } from '@mantine/hooks';
import { SetStateAction, useEffect } from 'react';
import { SetterOrUpdater } from 'recoil';

interface HeaderDrawerProps {
  open: boolean;
  setOpen: React.Dispatch<SetStateAction<boolean>> | SetterOrUpdater<boolean>;
  drawerProps?: Omit<DrawerProps, 'opened' | 'onClose'>;
  burgerProps?: Omit<BurgerProps, 'opened' | 'onClick'>;
  children?: React.ReactNode;
  title?: React.ReactNode;
}
export function HeaderDrawer({
  open,
  setOpen,
  drawerProps,
  burgerProps,
  children,
  title,
}: HeaderDrawerProps): JSX.Element {
  const theme = useMantineTheme();
  const viewport = useViewportSize();
  useEffect(() => {
    if (viewport.width < theme.breakpoints.xs) {
      setOpen(false);
    }
  }, [viewport.width, setOpen]);
  return (
    <>
      <Drawer
        opened={open}
        onClose={() => {
          setOpen(false);
        }}
        {...drawerProps}
      >
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            height: 10,
            width: '100%',
            backgroundColor: theme.colors[theme.primaryColor][6],
          }}
        />
        <Stack>
          {title}
          {children}
        </Stack>
      </Drawer>
      <Burger
        opened={open}
        onClick={() => {
          setOpen(!open);
        }}
        {...burgerProps}
      />
    </>
  );
}
