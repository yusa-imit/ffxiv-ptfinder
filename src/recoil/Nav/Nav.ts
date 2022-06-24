import { atom } from 'recoil';

export const nav = atom<boolean>({
  key: 'nav',
  default: false,
});
