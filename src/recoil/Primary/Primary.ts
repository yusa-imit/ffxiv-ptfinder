import { atom } from 'recoil';
import { MantineThemeColors } from '@mantine/core';
import { recoilPersist } from 'recoil-persist';

const { persistAtom } = recoilPersist();

export const Primary = atom<keyof MantineThemeColors>({
  key: 'app_primary',
  default: 'blue',
  effects_UNSTABLE: [persistAtom],
});
