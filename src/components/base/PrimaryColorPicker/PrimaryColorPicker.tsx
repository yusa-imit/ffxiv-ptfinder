import { Center, ColorSwatch, Group, Menu, useMantineTheme } from '@mantine/core';
import { useRecoilState } from 'recoil';
import PaletteIcon from '../../icons/PaletteIcon';
import PrimaryColorPickerStyles from './PrimaryColorPicker.styles';
import { Primary } from '../../../recoil/Primary/Primary';

export default function PrimaryColorPicker() {
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
      my="xl"
      mx={0}
      px={0}
      control={<PaletteIcon />}
      styles={{
        body: {
          marginTop: 15,
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
