import { atom } from 'recoil';
import { MantineThemeColors } from '@mantine/core';
import { AppSettingsType } from '@type/Settings';
import { persistAtomEffect } from '../SSR/persistAtomEffect';

const defaultValue: AppSettingsType = {
  previewDetail: true,
};

export const AppSettings = atom<AppSettingsType>({
  key: 'app_primary',
  default: defaultValue,
  effects_UNSTABLE: [persistAtomEffect],
});
