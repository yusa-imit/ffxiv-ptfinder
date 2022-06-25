import { useRecoilValue } from 'recoil';
import { forwardRef } from 'react';
import { ActionIcon } from '@mantine/core';
import { Palette } from 'tabler-icons-react';
import { Primary } from '../../../recoil/Primary/Primary';

interface PalleteIconProps extends React.ComponentPropsWithoutRef<'button'> {}
const PaletteIconForwarded = forwardRef<HTMLButtonElement, PalleteIconProps>(
  ({ ...others }: PalleteIconProps, ref) => {
    const app_primary = useRecoilValue(Primary);
    return (
      <ActionIcon
        ref={ref}
        sx={(theme) => ({
          backgroundColor:
            theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
          color:
            theme.colorScheme === 'dark' ? theme.colors.yellow[4] : theme.colors[app_primary][6],
        })}
        size="lg"
        {...others}
      >
        <Palette size={20} strokeWidth={2} color={app_primary[6]} />
      </ActionIcon>
    );
  }
);
export default PaletteIconForwarded;
