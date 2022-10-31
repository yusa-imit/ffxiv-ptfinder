import { atom } from 'recoil';
import { MantineThemeColors } from '@mantine/core';
import { AppSettingsType } from '@type/Settings';
import { persistAtomEffect } from '../SSR/persistAtomEffect';

const defaultValue: AppSettingsType = {
  preview_tag_detailed_reveal_as_default: false,
  preview_tag_job_reveal_as_default: false,
  preview_tag_reveal_as_default: false,
};

export const AppSettings = atom<AppSettingsType>({
  key: 'app_primary',
  default: defaultValue,
  effects_UNSTABLE: [persistAtomEffect],
});
