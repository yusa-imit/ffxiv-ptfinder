import { atom } from 'recoil';
import { MantineThemeColors } from '@mantine/core';
import { persistAtomEffect } from '../SSR/persistAtomEffect';

export const Primary = atom<keyof MantineThemeColors>({
  key: 'app_primary',
  default: 'blue',
  effects_UNSTABLE: [persistAtomEffect],
});
