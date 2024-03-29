import React from 'react';
import { useMantineColorScheme, ActionIcon, Group } from '@mantine/core';
import { Sun, MoonStars } from 'tabler-icons-react';
import { useRecoilValue } from 'recoil';
import { Primary } from '@recoil/Primary';

interface SimpleToggleColorSchemeProps {
  className: string;
}
export function SimpleToggleColorSheme({ className }: SimpleToggleColorSchemeProps) {
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  const app_primary = useRecoilValue(Primary);
  return (
    <Group position="center" my={13} className={className}>
      <ActionIcon
        onClick={() => toggleColorScheme()}
        size="lg"
        sx={(theme) => ({
          backgroundColor:
            theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
          color:
            theme.colorScheme === 'dark' ? theme.colors.yellow[4] : theme.colors[app_primary][6],
          '&:hover': {
            backgroundColor:
              theme.colorScheme === 'dark'
                ? theme.fn.lighten(theme.colors.dark[6], 0.05)
                : theme.fn.darken(theme.colors.gray[0], 0.05),
          },
          '&:active': {
            backgroundColor:
              theme.colorScheme === 'dark'
                ? theme.fn.lighten(theme.colors.dark[6], 0.1)
                : theme.fn.darken(theme.colors.gray[0], 0.1),
          },
        })}
      >
        {colorScheme === 'dark' ? <Sun size={18} /> : <MoonStars size={18} />}
      </ActionIcon>
    </Group>
  );
}
