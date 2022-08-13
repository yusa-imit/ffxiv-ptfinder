import { Group, GroupProps, Stack, StackProps } from '@mantine/core';
import { HeaderLinksWithIcon } from '@type/HeaderLinks';
import { DrawerLinkGroup } from './DrawerLinkGroup/DrawerLinkGroup';

interface NavigatorProps extends StackProps {
  links: HeaderLinksWithIcon;
}
export default function Navigator({ links, ...other }: NavigatorProps) {
  const items = links.map((link) => <DrawerLinkGroup {...link} key={link.label} />);
  return (
    <Stack {...other} spacing={0}>
      {items}
    </Stack>
  );
}
