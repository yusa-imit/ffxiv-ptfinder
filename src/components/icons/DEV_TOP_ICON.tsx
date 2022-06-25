import { ThreeDCubeSphere } from 'tabler-icons-react';
import { ActionIcon, MantineSize, MantineThemeColors, useMantineColorScheme } from '@mantine/core';
import { useRecoilValue } from 'recoil';
import { Primary } from '../../recoil/Primary/Primary';

export default function DEV_TOP_ICON({
  color,
  size,
  tablerSize,
}: {
  color?: MantineThemeColors[string][number];
  size?: MantineSize;
  tablerSize?: number;
}) {
  const app_primary = useRecoilValue(Primary);
  return (
    <ActionIcon radius={9999} variant="filled" color={color || app_primary} p={1} size={size}>
      <ThreeDCubeSphere size={tablerSize || 30} strokeWidth={2} color="white" />
    </ActionIcon>
  );
}
