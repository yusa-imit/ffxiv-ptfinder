import {
  Center,
  CheckIcon,
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
  const primary = useRecoilValue(Primary);
  const setPrimary = useSetRecoilState(Primary);
  const theme = useMantineTheme();
  const ColorItems = Object.keys(theme.colors).map((color) => {
    return (
      <ColorSwatch
        key={color}
        color={theme.colors[color][6]}
        style={{ color: theme.white, cursor: 'pointer' }}
        onClick={() => {
          setPrimary(color);
        }}
      >
        {primary === color && <CheckIcon width={13} />}
      </ColorSwatch>
    );
  });
  return (
    <Menu>
      <Menu.Target>
        <PaletteIconForwarded className={className} />
      </Menu.Target>
      <Menu.Dropdown>
        <Menu.Label>Change Primary Color</Menu.Label>
        <Center>
          <Group p={12} style={{ maxWidth: '180px' }}>
            {ColorItems}
          </Group>
        </Center>
      </Menu.Dropdown>
    </Menu>
  );
}
