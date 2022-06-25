import { Icon as TablerIcon } from 'tabler-icons-react';

interface HeaderLink {
  link?: string;
  label: string;
  links?: HeaderLink[];
}
export type HeaderLinks = HeaderLink[];

export interface HeaderLinkWithIcon extends HeaderLink {
  icon: TablerIcon;
}
export type HeaderLinksWithIcon = HeaderLinkWithIcon[];
