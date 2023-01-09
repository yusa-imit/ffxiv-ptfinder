import { ArticleData } from '@type/data/ArticleData';
import { ArticleAdditional } from './data/ArticleData';
import { DungeonType, Job, Region, Language } from './data/FFXIVInfo';

export type SearchKeys =
  | keyof Omit<
      ArticleData,
      | 'schedule'
      | 'answerType'
      | 'answerAddress'
      | 'description'
      | 'additional'
      | 'jobs'
      | 'specifyUserLanguage'
      | 'timezone'
      | 'type'
    >
  | keyof ArticleAdditional;

export interface SearchIndexContext {
  articleType: 0 | 1;
  title?: string;
  isTemporary?: boolean;
  content?: number;
  availableJobs?: Job[];
  minimumWeek?: number;
  voiceChat?: (0 | 1 | 2)[];
  region: Region;
  language: Language;
  heading?: boolean;
  firstTime?: boolean;
  firstWeekClear?: boolean;
  worldFirstRace?: boolean;
  farm?: boolean;
  boxNumber?: 0 | 1 | 2;
}
