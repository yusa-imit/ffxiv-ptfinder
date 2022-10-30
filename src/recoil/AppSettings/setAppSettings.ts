import { useSetRecoilState } from 'recoil';
import { AppSettings } from './AppSettings';
import { AppSettingsType } from '../../type/Settings';
import { ValueOf } from '../../type/ValueOf';

export function setAppSettings(key: keyof AppSettingsType, value: ValueOf<AppSettingsType>) {
  const setter = useSetRecoilState(AppSettings);
  setter((prev) => {
    const newValue = { ...prev };
    newValue[key] = value;
    return newValue;
  });
}
