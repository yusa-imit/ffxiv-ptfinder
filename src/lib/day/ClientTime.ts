import dayjs from 'dayjs';
import * as utc from 'dayjs/plugin/utc';
import * as timezone from 'dayjs/plugin/timezone';
import * as localizedFormat from 'dayjs/plugin/localizedFormat';
import { useSetRecoilState } from 'recoil';
import { Tz } from '@recoil/Tz';
import { Locale } from '@type/Locale';

dayjs.extend(utc.default);
dayjs.extend(timezone.default);
dayjs.extend(localizedFormat.default);
require('dayjs/locale/ko');
require('dayjs/locale/ja');
require('dayjs/locale/en');

export { dayjs };

export type ClientTimeSupportedLocale = 'ko' | 'ja' | 'en';

abstract class ClientTime {
  private static NEXT_TRANS_TIME_LOCALE: Record<Locale, ClientTimeSupportedLocale> = {
    kr: 'ko',
    en: 'en',
    jp: 'ja',
  };
  /**
   * add timezone to unix timestamp value based dayjs object
   * @param value unix-timestamp or utc epoch
   * @param target target timezone
   * @return new dayjs time object
   */
  static getTimezoneDayjsFromUnixTime(value: number, target?: string | null) {
    return dayjs.unix(value).tz(target || this.guessTimezone());
  }
  static guessTimezone() {
    return dayjs.tz.guess();
  }
  static setForceTimezone(value: string) {
    useSetRecoilState(Tz)(value);
  }
  static changeNextLocaleToTimeLocale(locale?: Locale) {
    return locale ? this.NEXT_TRANS_TIME_LOCALE[locale] : this.NEXT_TRANS_TIME_LOCALE.en;
  }
  static translateUnixTimeToLocalTime(
    value: number,
    target?: string | null,
    locale?: Locale
  ): string {
    return this.getTimezoneDayjsFromUnixTime(value, target)
      .locale(this.changeNextLocaleToTimeLocale(locale))
      .format('LLL');
  }
}

export default ClientTime;
