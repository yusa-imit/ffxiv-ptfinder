import { useMantineColorScheme } from '@mantine/core';
import { Primary } from '@recoil/Primary';
import { HeaderLinksWithIcon, HeaderLinkWithIcon } from '@type/HeaderLinks';
import { useRecoilValue } from 'recoil';
import { MoonStars, Sun } from 'tabler-icons-react';
import { DrawerLinkGroup } from '../HeaderDrawer/DrawerLinkGroup/DrawerLinkGroup';

export default function NavToggleColorScheme() {
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  const themeIcon = colorScheme === 'dark' ? Sun : MoonStars;
  const NavToggleButtonData: HeaderLinkWithIcon = {
    label: 'DEV_Change_Theme',
    icon: themeIcon,
  };
  return <DrawerLinkGroup {...NavToggleButtonData} onClick={() => toggleColorScheme()} />;
}
