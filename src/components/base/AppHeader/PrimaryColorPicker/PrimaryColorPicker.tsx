import {
  Center,
  CheckIcon,
  ColorSwatch,
  Group,
  MantineThemeColors,
  Menu,
  useMantineTheme,
} from '@mantine/core';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { Primary } from '@recoil/Primary';
import { setPrimary as globalSetPrimary } from '@recoil/Primary/setPrimary';
import { setCookies } from 'cookies-next';
import PaletteIconForwarded from './PaletteIconForwarded';

interface PrimaryColorPickerProps {
  className: string;
}
export default function PrimaryColorPicker({ className }: PrimaryColorPickerProps) {
  const primary = useRecoilValue(Primary);
  const theme = useMantineTheme();
  const setter = useSetRecoilState(Primary);
  function setPrimary(value: keyof MantineThemeColors) {
    setCookies('mantine-primary', value, { maxAge: 60 * 60 * 24 * 30 });
    setter(value);
  }

  const ColorItems = Object.keys(theme.colors).map((color) => {
    return (
      <ColorSwatch
        key={color}
        color={theme.colors[color][6]}
        style={{
          color: theme.white,
          cursor: 'pointer',
        }}
        onClick={() => {
          setPrimary(color);
        }}
      >
        {primary === color && <CheckIcon width={13} />}
      </ColorSwatch>
    );
  });
  return (
    <Menu styles={{}}>
      <Menu.Target>
        <PaletteIconForwarded className={className} />
      </Menu.Target>
      <Menu.Dropdown>
        <Menu.Label>Change Primary Color</Menu.Label>
        <Center>
          <Group p={12} spacing="xs" style={{ maxWidth: '160px' }}>
            {ColorItems}
          </Group>
        </Center>
      </Menu.Dropdown>
    </Menu>
  );
}
