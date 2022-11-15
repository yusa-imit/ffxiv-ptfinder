import dayjs from 'dayjs';
import * as utc from 'dayjs/plugin/utc';
import * as timezone from 'dayjs/plugin/timezone';

dayjs.extend(utc.default);
dayjs.extend(timezone.default);
require('dayjs/locale/ko');
require('dayjs/locale/ja');
require('dayjs/locale/en');

export { dayjs };

export type ClientTimeSupportedLocale = 'ko' | 'ja' | 'en';

abstract class ClientTime {
  /**
   * add timezone to unix timestamp value based dayjs object
   * @param value unix-timestamp or utc epoch
   * @param target target timezone
   * @return new dayjs time object
   */
  static translateUnixTimeToTarget(value: number, target?: string) {
    return dayjs.unix(value).tz(target || dayjs.tz.guess());
  }
  static translateUnixTimeToLocalTime(
    value: number,
    target?: string,
    locale?: ClientTimeSupportedLocale
  ): string {
    return this.translateUnixTimeToTarget(value, target)
      .locale(locale || 'en')
      .format('LLL');
  }
}

export default ClientTime;
