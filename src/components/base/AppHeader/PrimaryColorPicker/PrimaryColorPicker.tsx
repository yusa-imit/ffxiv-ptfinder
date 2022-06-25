import { Center, ColorSwatch, Group, Menu, useMantineTheme } from '@mantine/core';
import { useRecoilState } from 'recoil';
import { Primary } from '@recoil/Primary';
import PaletteIconForwarded from './PaletteIconForwarded';

interface PrimaryColorPickerProps {
  className: string;
}
export default function PrimaryColorPicker({ className }: PrimaryColorPickerProps) {
  const [app_primary, setPrimary] = useRecoilState(Primary);
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
      mt={13}
      mb={13}
      mx={0}
      px={0}
      control={<PaletteIconForwarded />}
      className={className}
      styles={{
        body: {
          marginTop: 0,
        },
      }}
    >
      <Menu.Label>Change Primary Color</Menu.Label>
      <Center>
        <Group p={12}>{ColorItems}</Group>
      </Center>
    </Menu>
  );
}
