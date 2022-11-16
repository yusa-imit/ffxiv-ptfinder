import { atom } from 'recoil';
import { MantineThemeColors } from '@mantine/core';
import { persistAtomEffect } from '../SSR/persistAtomEffect';

export const Tz = atom<string | null>({
  key: 'tz',
  default: null,
  effects_UNSTABLE: [persistAtomEffect],
});
