import { Palette } from 'tabler-icons-react';
import { ActionIcon, ActionIconProps, MantineNumberSize, Sx } from '@mantine/core';
import { useRecoilValue } from 'recoil';
import { RefObject } from 'react';
import { Primary } from '../../recoil/Primary';

interface PaletteIconProps extends ActionIconProps<'button'> {
  ref?: ((instance: HTMLButtonElement | null) => void) | RefObject<HTMLButtonElement> | null;
  sx?: Sx | (Sx | undefined)[];
  size?: MantineNumberSize;
}
export default function PaletteIcon({ ref, sx, size, ...others }: PaletteIconProps) {
  const app_primary = useRecoilValue(Primary);
  return (
    <ActionIcon ref={ref} sx={sx} size={size} {...others}>
      <Palette size={20} strokeWidth={2} color={app_primary[6]} />
    </ActionIcon>
  );
}
