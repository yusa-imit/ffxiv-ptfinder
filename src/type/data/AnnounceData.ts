import { Locale } from '../Locale';
import { FirebaseServerTime } from './FirebaseServerTime';
import { announceTypes } from '../../constant/announceTypes';

export type DBAnnounceData = {
  date: number;
  type: keyof typeof announceTypes;
  titles: Record<Locale, string>;
  descriptions: Record<Locale, string>;
};

export type PreDBAnnouceData = {
  type: keyof typeof announceTypes;
  titles: Record<Locale, string>;
  descriptions: Record<Locale, string>;
};

export type AnnounceData = {
  date: number;
  type: keyof typeof announceTypes;
  title: string;
  description: string;
};

export type AnnounceSummary = {
  date: number;
  type: keyof typeof announceTypes;
  title: string;
};
