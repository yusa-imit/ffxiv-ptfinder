import { atom } from 'recoil';
import { ArticleData } from '../../type/data/ArticleData';

export const Article = atom<ArticleData>({
  key: 'article',
  default: {
    articleType: 0,
    status: 0,
    userId: '',
    title: '',
    description: '',
    isTemporary: false,
    schedule: {
      writtenInDescription: false,
      dateTime: undefined,
      adjustable: false,
      day: undefined,
      dayPerWeek: undefined,
      timeType: 0,
      time: undefined,
      timezone: undefined,
    },
    content: -1,
    type: 'raid',
    jobs: [[[]]],
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
  },
});
