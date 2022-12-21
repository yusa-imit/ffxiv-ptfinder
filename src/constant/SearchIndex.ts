import { ArticleData } from '@type/data/ArticleData';
import { ArticleAdditional } from '../type/data/ArticleData';
import { ValueOf } from '../type/ValueOf';

type AvailableSearchContext =
  | 'a'
  | 'b'
  | 'c'
  | 'd'
  | 'e'
  | 'f'
  | 'g'
  | 'h'
  | 'i'
  | 'ja'
  | 'jb'
  | 'jc'
  | 'jd'
  | 'je'
  | 'jf'
  | 'k'
  | 'l'
  | 'm';
export const SearchIndex: {
  [k in
    | keyof Omit<
        ArticleData,
        'schedule' | 'answerType' | 'answerAddress' | 'description' | 'additional' | 'jobs'
      >
    | keyof ArticleAdditional]: AvailableSearchContext;
} = {
  articleType: 'a',
  title: 'b',
  isTemporary: 'c',
  content: 'd',
  type: 'e',
  availableJobs: 'f',
  minimumWeek: 'g',
  voiceChat: 'h',
  region: 'i',
  language: 'k',
  specifyUserLanguage: 'l',
  timezone: 'm',
  heading: 'ja',
  firstTime: 'jb',
  firstWeekClear: 'jc',
  worldFirstRace: 'jd',
  farm: 'je',
  boxNumber: 'jf',
};

export const ReversedSearchIndex: {
  [k in AvailableSearchContext]:
    | keyof Omit<
        ArticleData,
        'schedule' | 'answerType' | 'answerAddress' | 'description' | 'additional' | 'jobs'
      >
    | keyof ArticleAdditional;
} = {
  a: 'articleType',
  b: 'title',
  c: 'isTemporary',
  d: 'content',
  e: 'type',
  f: 'availableJobs',
  g: 'minimumWeek',
  h: 'voiceChat',
  i: 'region',
  k: 'language',
  l: 'specifyUserLanguage',
  m: 'timezone',
  ja: 'heading',
  jb: 'firstTime',
  jc: 'firstWeekClear',
  jd: 'worldFirstRace',
  je: 'farm',
  jf: 'boxNumber',
};
