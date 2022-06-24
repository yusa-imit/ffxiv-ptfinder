import { ThreeDCubeSphere } from 'tabler-icons-react';
import { ActionIcon, MantineThemeColors, useMantineColorScheme } from '@mantine/core';
import { useRecoilValue } from 'recoil';
import { Primary } from '../../recoil/Primary/Primary';

export default function DEV_TOP_ICON({ color }: { color?: MantineThemeColors[string][number] }) {
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  const app_primary = useRecoilValue(Primary);
  return (
    <ActionIcon radius={9999} variant="filled" color={color || app_primary} p={1}>
      <ThreeDCubeSphere size={30} strokeWidth={2} color="white" />
    </ActionIcon>
  );
}
