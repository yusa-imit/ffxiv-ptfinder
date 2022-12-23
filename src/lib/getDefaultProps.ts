import { useRouter } from 'next/router';
import { Region } from '@type/data/FFXIVInfo';
import { Locale } from '../type/Locale';
import { Language } from '../type/data/FFXIVInfo';

export function getDefulatProps() {
  const router = useRouter();
  const getRegion = (locale?: string): Region => {
    switch (locale) {
      case 'kr':
        return 'KR';
      case 'jp':
        return 'JP';
      case 'cn':
        return 'CN';
      default:
        return 'NA';
    }
  };
  return {
    language: (router.locale as Language) || 'EN',
    region: getRegion(router.locale),
  };
}
