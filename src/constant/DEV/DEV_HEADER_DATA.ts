import { Gauge, Lock, Note } from 'tabler-icons-react';
import { HeaderLinks, HeaderLinksWithIcon } from '../../type/HeaderLinks';

export const DEV_HEADER_DATA: HeaderLinksWithIcon = [
  { label: 'Menu1', link: '/', icon: Note },
  { label: 'Menu2', link: '/', icon: Gauge },
  { label: 'Menu3', link: '/', icon: Lock },
];
