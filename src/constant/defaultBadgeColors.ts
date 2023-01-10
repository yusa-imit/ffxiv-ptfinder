import { MantineColor } from '@mantine/core';
import { DungeonType } from '../type/data/FFXIVInfo';

export const BadgeColor: { [key: string]: MantineColor } = {
  isTemporary: 'red',
  region: 'blue',
  language: 'cyan',
  minimumWeek: 'indigo',
  voiceChat: 'lime',
  fwc: 'pink',
  wfr: 'pink',
  farm: 'orange',
  firstTime: 'yellow',
  heading: 'yellow',
  box: 'orange',
  langRestriction: 'teal',
  timezone: 'grape',
  adjustable: 'blue',
  dayPerWeek: 'green',
  day: 'green',
  notice: 'yellow',
  update: 'blue',
  maintenance: 'red',
};

export const VersionColor: { [key: string]: MantineColor } = {
  '2': 'teal',
  '3': 'blue',
  '4': 'red',
  '5': 'dark',
  '6': 'violet',
};

export const DungeonTypeColor: Record<DungeonType, MantineColor> = {
  raid: 'violet',
  extreme: 'red',
  ultimate: 'dark',
  alliance: 'cyan',
  etc: 'green',
};
