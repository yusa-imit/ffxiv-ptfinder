import { Center, CheckIcon, ColorSwatch, Group, Menu, useMantineTheme } from '@mantine/core';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { Primary } from '@recoil/Primary';
import PaletteIconForwarded from './PaletteIconForwarded';

interface PrimaryColorPickerProps {
  className: string;
}
export default function PrimaryColorPicker({ className }: PrimaryColorPickerProps) {
  const primary = useRecoilValue(Primary);
  const setPrimary = useSetRecoilState(Primary);
  const theme = useMantineTheme();
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
