import { atom } from 'recoil';

export const Nav = atom<boolean>({
  key: 'nav',
  default: false,
});
