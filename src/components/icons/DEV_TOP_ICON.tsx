import { ThreeDCubeSphere } from 'tabler-icons-react';
import { MantineThemeColors } from '@mantine/core';
import { useRecoilValue } from 'recoil';
import { Primary } from '../../recoil/Primary/Primary';

export default function DEV_TOP_ICON({ color }: { color?: MantineThemeColors[string][number] }) {
  const app_primary = useRecoilValue(Primary);
  return <ThreeDCubeSphere size={30} strokeWidth={2} color={color || app_primary} />;
}
