import { Locale } from '@type/Locale';
import { DungeonType } from './FFXIVInfo';

export type DBInstance = {
  type: DungeonType;
  code: number;
  partyNumber: number;
  title: Record<Locale, string>;
};
