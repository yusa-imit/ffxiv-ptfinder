import { ArticleData } from '../type/data/ArticleData';

export const defaultArticle: ArticleData = {
  articleType: 0,
  title: '',
  description: '',
  isTemporary: false,
  schedule: {
    writtenInDescription: false,
    dateTime: undefined,
    adjustable: false,
    day: undefined,
    dayPerWeek: undefined,
    timeType: undefined,
    time: undefined,
    average: undefined,
  },
  content: -1,
  type: 'raid',
  jobs: [[[]]],
  availableJobs: [],
  minimumWeek: 1,
  additional: {
    heading: false,
    firstTime: false,
    firstWeekClear: false,
    worldFirstRace: false,
    farm: false,
    boxNumber: undefined,
  },
  voiceChat: 0,
  region: 'JP',
  language: 'JP',
  specifyUserLanguage: undefined,
  answerType: 0,
  answerAddress: '',
  timezone: undefined,
};
