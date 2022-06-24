import React from 'react';
import { useMantineColorScheme, ActionIcon, Group } from '@mantine/core';
import { Sun, MoonStars } from 'tabler-icons-react';
import { useRecoilValue } from 'recoil';
import { Primary } from '../../../recoil/Primary/Primary';

export function SimpleToggleColorSheme() {
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  const app_primary = useRecoilValue(Primary);
  return (
    <Group position="center" my="xl">
      <ActionIcon
        onClick={() => toggleColorScheme()}
        size="lg"
        sx={(theme) => ({
          backgroundColor:
            theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
          color:
            theme.colorScheme === 'dark' ? theme.colors.yellow[4] : theme.colors[app_primary][6],
        })}
      >
        {colorScheme === 'dark' ? <Sun size={18} /> : <MoonStars size={18} />}
      </ActionIcon>
    </Group>
  );
}
