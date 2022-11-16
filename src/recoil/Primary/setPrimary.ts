import { MantineThemeColors } from '@mantine/core';
import { setCookies } from 'cookies-next';
import { useSetRecoilState } from 'recoil';
import { Primary } from './index';

export function setPrimary(value: keyof MantineThemeColors) {
  const setter = useSetRecoilState(Primary);
  setCookies('mantine-primary', value, { maxAge: 60 * 60 * 24 * 30 });
  setter(value);
}
