import { Group, GroupProps } from '@mantine/core';
import { HeaderLinksWithIcon } from '@type/HeaderLinks';
import { DrawerLinkGroup } from './DrawerLinkGroup/DrawerLinkGroup';

interface NavigatorProps extends GroupProps {
  links: HeaderLinksWithIcon;
}
export default function Navigator({ links, ...other }: NavigatorProps) {
  const items = links.map((link) => <DrawerLinkGroup {...link} key={link.label} />);
  return (
    <Group direction="column" {...other} spacing={0}>
      {items}
    </Group>
  );
}
