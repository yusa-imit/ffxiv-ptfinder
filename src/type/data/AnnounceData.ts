import { Locale } from '../Locale';
import { FirebaseServerTime } from './FirebaseServerTime';

export type DBAnnounceData = {
  date: FirebaseServerTime;
  type: number;
  titles: Record<Locale, string>;
  descriptions: Record<Locale, String>;
};

export type AnnounceData = {
  date: FirebaseServerTime;
  type: number;
  title: string;
  description: string;
};

export type AnnounceSummary = {
  date: FirebaseServerTime;
  type: number;
  title: string;
};
