import { Timezone } from '@type/data/Timezone';
import timezones from './timezones.json';

export function timezone(tz: Timezone) {
  return timezones[tz];
}
