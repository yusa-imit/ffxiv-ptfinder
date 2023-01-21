import { SearchIndexContext } from '../type/SearchIndex';

export const defaultSearchIndexContext: SearchIndexContext = {
  articleType: 0,
  title: '',
  isTemporary: false,
  content: -1,
  availableJobs: [],
  minimumWeek: 0,
  voiceChat: [],
  region: undefined,
  language: undefined,
  heading: false,
  firstTime: false,
  firstWeekClear: false,
  worldFirstRace: false,
  farm: false,
  boxNumber: 0,
};
