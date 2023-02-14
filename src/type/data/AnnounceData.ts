import { Locale } from '../Locale';
import { FirebaseServerTime } from './FirebaseServerTime';
import { announceTypesValue } from '../../constant/announceTypes';

export type AnnounceType = typeof announceTypesValue[number];

export type DBAnnounceData = {
  _id: string;
  id: string;
  date: number;
  type: AnnounceType;
  titles: Record<Locale, string>;
  descriptions: Record<Locale, string>;
};

export type PreDBAnnouceData = {
  id: string;
  type: AnnounceType;
  titles: Record<Locale, string>;
  descriptions: Record<Locale, string>;
};

export type AnnounceData = {
  id: string;
  date: number;
  type: AnnounceType;
  title: string;
  description: string;
};

export type AnnounceSummary = {
  id: string;
  date: number;
  type: AnnounceType;
  title: string;
};
