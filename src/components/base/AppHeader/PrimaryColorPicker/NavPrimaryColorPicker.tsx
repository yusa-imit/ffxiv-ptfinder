import {
  Center,
  ColorSwatch,
  Group,
  Menu,
  UnstyledButton,
  UnstyledButtonProps,
  useMantineTheme,
} from '@mantine/core';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { Primary } from '@recoil/Primary';
import { forwardRef } from 'react';
import { Palette } from 'tabler-icons-react';
import { DrawerLinkGroup } from '../HeaderDrawer/DrawerLinkGroup/DrawerLinkGroup';

interface PalleteIconProps extends React.ComponentPropsWithoutRef<'button'> {}
const PaletteIconForwarded = forwardRef<HTMLButtonElement, PalleteIconProps>(
  ({ ...others }: PalleteIconProps, ref) => {
    return (
      <UnstyledButton ref={ref} style={{ display: 'block', width: '100%' }} {...others}>
        <DrawerLinkGroup icon={Palette} label="DEV_Change_Primary" />
      </UnstyledButton>
    );
  }
);

interface NavPrimaryColorPickerProps {
  className?: string;
}
export default function NavPrimaryColorPicker({ className }: NavPrimaryColorPickerProps) {
  const setPrimary = useSetRecoilState(Primary);
  const theme = useMantineTheme();
  const ColorItems = Object.keys(theme.colors).map((color) => {
    return (
      <ColorSwatch
        key={color}
        color={theme.colors[color][6]}
        style={{
          cursor: 'pointer',
        }}
        onClick={() => {
          setPrimary(color);
        }}
      />
    );
  });
  return (
    <Menu
      control={<PaletteIconForwarded />}
      className={className}
      styles={{ root: { maxWidth: '100%' } }}
    >
      <Menu.Label>Change Primary Color</Menu.Label>
      <Center>
        <Group p={12}>{ColorItems}</Group>
      </Center>
    </Menu>
  );
}
