import { Timezone } from './Timezone';

export type TimezoneData = Record<Timezone, AbbrData>;

interface AbbrData {
  displayName: string;
  name: string;
  offset: number;
}
